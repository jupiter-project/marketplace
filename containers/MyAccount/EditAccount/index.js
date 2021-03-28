
import { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as jupiterAPI from 'services/api-jupiter';
import { setCurrentUser } from 'actions/auth'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import MagicTextField from 'components/UI/TextFields/MagicTextField'
import {
  STRING_VALID,
  PASSPHRASE_VALID
} from 'utils/constants/validations'
import usePopUp from 'utils/hooks/usePopUp'
import MESSAGES from 'utils/constants/messages'
import useLoading from 'utils/hooks/useLoading'

const schema = yup.object().shape({
  name: STRING_VALID,
  description: STRING_VALID,
  passphrase: PASSPHRASE_VALID
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 560,
    padding: theme.spacing(3, 0),
    backgroundColor: theme.palette.background.default
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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

  const { currentUser } = useSelector(state => state.auth);

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
        secretPhrase: data.passphrase,
        publicKey: currentUser.publicKey
      }

      let response = await jupiterAPI.setAccountInfo(params);
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
  }, [currentUser, dispatch, setPopUp, changeLoadingStatus]);

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
      {
        !currentUser?.balanceNQT &&
        <Typography
          variant='body1'
          color='primary'
          align='center'
          gutterBottom
        >
          Your account is not active.
          <br />
          Please have at least one transaction on Jupiter.
        </Typography>
      }
      <Controller
        as={<MagicTextField />}
        name='name'
        label='Name'
        error={errors.name?.message}
        className={classes.input}
        control={control}
        defaultValue={currentUser?.name || ''}
      />
      <Controller
        as={<MagicTextField />}
        multiline
        rows={4}
        name='description'
        label='Description'
        error={errors.description?.message}
        className={classes.input}
        control={control}
        defaultValue={currentUser?.description || ''}
      />
      <Controller
        as={<MagicTextField />}
        type='password'
        name='passphrase'
        label='Passphrase'
        error={errors.passphrase?.message}
        className={classes.input}
        control={control}
        defaultValue=''
      />
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