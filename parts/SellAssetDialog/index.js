
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
import MESSAGES from 'utils/constants/messages'
import { NQT_WEIGHT } from 'utils/constants/common'
import {
  PRICE_VALID,
  PASSPHRASE_VALID
} from 'utils/constants/validations'
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: theme.spacing(2, 0)
  },
  button: {
    marginTop: theme.spacing(3)
  }
}));

const SellAssetDialog = ({
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
      let params = {
        asset: item.asset,
        quantity: 1,
        price: Math.round(data.price * NQT_WEIGHT),
        publicKey: currentUser.publicKey,
      }

      const { unsignedTransactionBytes = '', errorCode = '' } = await jupiterAPI.placeAskOrder(params)
      if (errorCode) {
        setPopUp({ text: MESSAGES.PLACE_ASK_ORDER_ERROR })
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
        setPopUp({ text: MESSAGES.PLACE_ASK_ORDER_ERROR })
        changeLoadingStatus(false)
        return;
      }

      setPopUp({ text: MESSAGES.PLACE_ASK_ORDER_SUCCESS })
      setOpen(false);
    } catch (error) {
      console.log(error)
      setPopUp({ text: MESSAGES.PLACE_ASK_ORDER_ERROR })
    }
    changeLoadingStatus(false)
  }, [isWallet, item, currentUser, setOpen, setPopUp, changeLoadingStatus]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <MagicDialog
      open={open}
      title='Place Sell Order'
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
              defaultValue={0}
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
          Place Sell Order
        </ContainedButton>
      </form>
    </MagicDialog>
  );
}

export default memo(SellAssetDialog)