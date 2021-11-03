
import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
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
import { PASSPHRASE_VALID } from 'utils/constants/validations'
import MESSAGES from 'utils/constants/messages'
import ORDER_TYPE from 'utils/constants/order-type'
import signTransaction from 'utils/helpers/signTransaction'

const schemaPassphrase = yup.object().shape({
  passphrase: PASSPHRASE_VALID
});

const schemaNoPassphrase = yup.object().shape({});

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

const CancelNFTOrderDialog = ({
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
        order: item.order,
        publicKey: currentUser.publicKey,
      }

      let response;
      if (ORDER_TYPE.ASK === item.type) {
        response = await jupiterAPI.cancelAskOrder(params)
      } else {
        response = await jupiterAPI.cancelBidOrder(params)
      }

      const { unsignedTransactionBytes = '', errorCode = '' } = response;
      if (errorCode) {
        setPopUp({ text: MESSAGES.CANCEL_NFT_ORDER_ERROR })
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
      response = await jupiterAPI.broadcastTransaction(transactionBytes);
      if (response?.errorCode) {
        setPopUp({ text: MESSAGES.CANCEL_NFT_ORDER_ERROR })
        changeLoadingStatus(false)
        return;
      }

      setPopUp({ text: MESSAGES.CANCEL_NFT_ORDER_SUCCESS })
      setOpen(false);
    } catch (error) {
      console.log(error)
      setPopUp({ text: MESSAGES.CANCEL_NFT_ORDER_ERROR })
    }
    changeLoadingStatus(false)
  }, [isWallet, item, currentUser, setOpen, setPopUp, changeLoadingStatus]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <MagicDialog
      open={open}
      title='Delete Asset Order'
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
        {!isWallet &&
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
        }
        <ContainedButton
          type='submit'
          className={classes.button}
        >
          Delete
        </ContainedButton>
      </form>
    </MagicDialog>
  );
}

export default memo(CancelNFTOrderDialog)