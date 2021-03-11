
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as jupiterAPI from 'services/api-jupiter';
import GradientButton from 'components/UI/Buttons/GradientButton'
import MagicTextField from 'components/UI/TextFields/MagicTextField'
import {
  STRING_VALID,
  PASSPHRASE_VALID
} from 'utils/constants/validations'
import { showErrorToast } from 'utils/helpers/toast'

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
  const { currentUser } = useSelector(state => state.auth);

  const { control, errors, formState, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  })

  const { isDirty } = formState;

  const onSubmit = async (data) => {
    try {
      const params = {
        name: data.name,
        description: data.description,
        secretPhrase: data.passphrase,
        publicKey: currentUser.publicKey
      }

      const response = await jupiterAPI.setAccountInfo(params)
      console.log(response)
    } catch (error) {
      if (error.response) {
        const { data: { message } } = error.response;
        showErrorToast(message)
      }
    }
  };

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
        SET ACCOUNT INFO
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
      <GradientButton
        type='submit'
        disabled={!currentUser?.balanceNQT || !isDirty}
        className={classes.button}
      >
        Submit
      </GradientButton>
    </form>
  )
}

export default memo(EditAccount)