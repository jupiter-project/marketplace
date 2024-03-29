
import { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as jupiterAPI from 'services/api-jupiter';
import * as europaAPI from 'services/europa'
import { setCurrentUser } from 'actions/auth'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import MagicTextField from 'components/UI/TextFields/MagicTextField'
import {
  ACCOUNT_NAME_VALID,
  ACCOUNT_DESCRIPTION_VALID,
  PASSPHRASE_VALID
} from 'utils/constants/validations'
import usePopUp from 'utils/hooks/usePopUp'
import MESSAGES from 'utils/constants/messages'
import useLoading from 'utils/hooks/useLoading'
import signTransaction from 'utils/helpers/signTransaction'
import { isEmpty } from 'utils/helpers/utility'

const schemaPassphrase = yup.object().shape({
  name: ACCOUNT_NAME_VALID,
  description: ACCOUNT_DESCRIPTION_VALID,
  passphrase: PASSPHRASE_VALID
});

const schemaNoPassphrase = yup.object().shape({
  name: ACCOUNT_NAME_VALID,
  description: ACCOUNT_DESCRIPTION_VALID,
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 560,
    padding: theme.spacing(3, 0)
  },
  title: {
    fontSize: 24,
    marginBottom: theme.spacing(2)
  },
  input: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(2, 0)
  }
}));

const EditAccount = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { setPopUp } = usePopUp();
  const { changeLoadingStatus } = useLoading();

  const { currentUser, isWallet } = useSelector(state => state.auth);

  const schema = isWallet ? schemaNoPassphrase : schemaPassphrase
  const { control, errors, formState, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  })

  const { isDirty } = formState;

  const onSubmit = useCallback(async (data) => {
    changeLoadingStatus(true)
    try {
      let params = {
        name: data.name,
        description: data.description,
        publicKey: currentUser.publicKey
      }

      const { unsignedTransactionBytes = '', errorCode = '' } = await jupiterAPI.setAccountInfo(params);
      if (errorCode) {
        setPopUp({ text: MESSAGES.SET_ACCOUNT_ERROR })
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
        setPopUp({ text: MESSAGES.SET_ACCOUNT_ERROR })
        changeLoadingStatus(false)
        return;
      }

      const { transactionJSON: { feeNQT = 0 } = {} } = response;
      dispatch(setCurrentUser({
        ...currentUser,
        balanceNQT: parseInt(currentUser.balanceNQT) - feeNQT,
        name: data.name,
        description: data.description,
      }))
      setPopUp({ text: MESSAGES.SET_ACCOUNT_SUCCESS })
    } catch (error) {
      console.log(error)
      setPopUp({ text: MESSAGES.SET_ACCOUNT_ERROR })
    }
    changeLoadingStatus(false)
  }, [isWallet, currentUser, dispatch, setPopUp, changeLoadingStatus]);

  return (
    <form
      noValidate
      className={classes.root}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography
        color='textPrimary'
        className={classes.title}
      >
        ACCOUNT INFO
      </Typography>
      {!isEmpty(currentUser) &&
        <>
          <Controller
            as={<MagicTextField />}
            name='name'
            label='Name (max 100 characters)'
            error={errors.name?.message}
            className={classes.input}
            control={control}
            defaultValue={currentUser?.name || ''}
          />
          <Controller
            as={<MagicTextField />}
            multiline
            rows={6}
            name='description'
            label='Description (max 1000 characters)'
            error={errors.description?.message}
            className={classes.input}
            control={control}
            defaultValue={currentUser?.description || ''}
          />
        </>
      }
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
        disabled={!currentUser?.balanceNQT || !isDirty}
        className={classes.button}
      >
        Update Account
      </ContainedButton>
    </form>
  )
}

export default memo(EditAccount)