
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
import MagicDialog from 'components/MagicDialog'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import MagicTextField from 'components/UI/TextFields/MagicTextField'
import AccountTextField from 'components/UI/TextFields/AccountTextField'
import usePopUp from 'utils/hooks/usePopUp'
import useLoading from 'utils/hooks/useLoading'
import MESSAGES from 'utils/constants/messages'
import {
  ACCOUNT_VALID,
  PASSPHRASE_VALID
} from 'utils/constants/validations'
import TEXT_MASKS from 'utils/constants/text-masks'
import signTransaction from 'utils/helpers/signTransaction'

const schema = yup.object().shape({
  account: ACCOUNT_VALID,
  passphrase: PASSPHRASE_VALID
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

const SendAssetDialog = ({
  open,
  setOpen,
  item,
}) => {
  const classes = useStyles();
  const { setPopUp } = usePopUp();
  const { changeLoadingStatus } = useLoading();
  const { currentUser } = useSelector(state => state.auth);

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = useCallback(async (data) => {
    changeLoadingStatus(true)
    try {
      const params = {
        receiver: data.account,
        asset: item.asset,
        amount: 1,
        publicKey: currentUser.publicKey
      }

      const { unsignedTransactionBytes = '', errorCode = '' } = await jupiterAPI.transferAsset(params)
      if (errorCode) {
        setPopUp({ text: MESSAGES.SEND_ASSET_ERROR })
        changeLoadingStatus(false)
        return;
      }

      const transactionBytes = signTransaction(unsignedTransactionBytes, data.passphrase)
      const response = await jupiterAPI.broadcastTransaction(transactionBytes);
      if (response?.errorCode) {
        setPopUp({ text: MESSAGES.SEND_ASSET_ERROR })
        changeLoadingStatus(false)
        return;
      }

      setPopUp({ text: MESSAGES.SEND_ASSET_SUCCESS })
      setOpen(false);
    } catch (error) {
      console.log(error)
      setPopUp({ text: MESSAGES.SEND_ASSET_ERROR })
    }
    changeLoadingStatus(false)
  }, [item, currentUser, setOpen, setPopUp, changeLoadingStatus]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <MagicDialog
      open={open}
      title='Send Asset'
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
              as={<AccountTextField />}
              name='account'
              label='Receiver Address'
              placeholder='JUP-____-____-____-_____'
              mask={TEXT_MASKS.ACCOUNT}
              error={errors.account?.message}
              control={control}
              defaultValue=''
            />
          </Grid>
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
        </Grid>
        <ContainedButton
          type='submit'
          className={classes.button}
        >
          Send Asset
        </ContainedButton>
      </form>
    </MagicDialog>
  );
}

export default memo(SendAssetDialog)