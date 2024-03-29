
import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import {
  Grid,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as jupiterAPI from 'services/api-jupiter'
import * as europaAPI from 'services/europa'
import MagicDialog from 'components/MagicDialog'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import MagicTextField from 'components/UI/TextFields/MagicTextField'
import usePopUp from 'utils/hooks/usePopUp'
import useLoading from 'utils/hooks/useLoading'
import { PASSPHRASE_VALID, PRICE_VALID } from 'utils/constants/validations'
import { NQT_WEIGHT } from 'utils/constants/common'
import MESSAGES from 'utils/constants/messages'
import signTransaction from 'utils/helpers/signTransaction'

const schemaPassphrase = yup.object().shape({
  price: PRICE_VALID,
  passphrase: PASSPHRASE_VALID
});

const schemaNoPassphrase = yup.object().shape({
  price: PRICE_VALID,
});

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  image: {
    height: 150,
    maxWidth: '100%',
    objectFit: 'contain',
    borderRadius: 16,
    border: `2px solid ${theme.custom.palette.border}`,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: theme.spacing(2, 0)
  },
  button: {
    marginTop: theme.spacing(3)
  }
}));

const BidNFTDialog = ({
  open,
  setOpen,
  item,
}) => {
  const classes = useStyles();
  const { setPopUp } = usePopUp();
  const { changeLoadingStatus } = useLoading();
  const { currentUser, isWallet } = useSelector(state => state.auth);

  const schema = isWallet ? schemaNoPassphrase : schemaPassphrase
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = useCallback(async (data) => {
    changeLoadingStatus(true)
    try {
      const params = {
        asset: item.asset,
        price: Math.round(data.price * NQT_WEIGHT),
        quantity: 1,
        publicKey: currentUser.publicKey,
      }

      const { unsignedTransactionBytes = '', errorCode = '' } = await jupiterAPI.placeBidOrder(params)
      if (errorCode) {
        setPopUp({ text: MESSAGES.BID_NFT_ERROR })
        changeLoadingStatus(false)
        return;
      }

      let passphrase;
      if (isWallet) {
        passphrase = await europaAPI.getPassphrase()
      } else {
        passphrase = data.passphrase
      }

      const transactionBytes = signTransaction(unsignedTransactionBytes, passphrase)
      const response = await jupiterAPI.broadcastTransaction(transactionBytes);
      if (response?.errorCode) {
        setPopUp({ text: MESSAGES.BID_NFT_ERROR })
        changeLoadingStatus(false)
        return;
      }

      setPopUp({ text: MESSAGES.BID_NFT_SUCCESS })
      setOpen(false);
    } catch (error) {
      console.log(error)
      setPopUp({ text: MESSAGES.BID_NFT_ERROR })
    }
    changeLoadingStatus(false)
  }, [isWallet, item, currentUser, setOpen, setPopUp, changeLoadingStatus]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <MagicDialog
      open={open}
      title='Place a bid'
      onClose={handleClose}
    >
      <form
        noValidate
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography color='primary' className={classes.title}>
          {item.description}
        </Typography>
        <Typography variant='h6' color='textPrimary'>
          {item.priceNQT
            ? `Price: ${item.priceNQT / NQT_WEIGHT} JUP`
            : 'No Price'
          }
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              as={<MagicTextField />}
              name='price'
              label='Price (JUP)'
              type='number'
              placeholder='Price'
              inputProps={{ min: 0 }}
              error={errors.price?.message}
              control={control}
              defaultValue={item?.priceNQT / NQT_WEIGHT || 0}
            />
          </Grid>
          {!isWallet &&
            <Grid item xs={12}>
              <Controller
                as={<MagicTextField />}
                type='password'
                name='passphrase'
                label='Passphrase'
                placeholder='Passphrase'
                error={errors.passphrase?.message}
                control={control}
                defaultValue=''
              />
            </Grid>
          }
        </Grid>
        <ContainedButton
          type='submit'
          className={classes.button}
        >
          Place a bid
        </ContainedButton>
      </form>
    </MagicDialog>
  );
}

export default memo(BidNFTDialog)