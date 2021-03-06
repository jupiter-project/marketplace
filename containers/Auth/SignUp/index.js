
import { memo, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as authAPI from 'services/api-auth'
import GradientButton from 'components/UI/Buttons/GradientButton'
import LinkButton from 'components/UI/Buttons/LinkButton'
import MagicTextField from 'components/UI/MagicTextField'
import AuthWrapper, { authPageStyles } from '../Shared/AuthWrapper'
import useLoading from 'utils/hooks/useLoading'
import { showErrorToast, showSuccessToast } from 'utils/helpers/toast'
import LINKS from 'utils/constants/links'

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex'
  },
  signIn: {
    paddingLeft: theme.spacing(1)
  }
}));

const SignUp = () => {
  const classes = useStyles();
  const authClasses = authPageStyles();
  const router = useRouter();
  const { changeLoadingStatus } = useLoading();

  const [newPassphrase, setNewPassphrase] = useState('')

  useEffect(() => {
    setNewPassphrase('raise lightning creak screen break tune glory bury such write world wrong')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const schema = yup.object().shape({
    passphrase: yup.string()
      .required('Please input field.')
      .oneOf( [newPassphrase],
        'Passphrase is not match.'
      )
  });

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    changeLoadingStatus(true)
    try {
      const params = {
        passphrase: data.passphrase,
      }

      const { message } = await authAPI.register(params);
      showSuccessToast(message)
      router.push(LINKS.HOME.HREF)
    } catch (error) {
      if (error.response) {
        const { data: { message } } = error.response;
        showErrorToast(message)
      }
    }
    changeLoadingStatus(false)
  };

  return (
    <AuthWrapper>
      <form
        noValidate
        className={authClasses.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <MagicTextField
          multiline
          disabled
          label='Passphrase'
          className={authClasses.input}
          value={newPassphrase}
        />
        <Controller
          as={<MagicTextField />}
          multiline
          name='passphrase'
          label='Confirm Passphrase'
          error={errors.passphrase?.message}
          className={authClasses.input}
          control={control}
          defaultValue=''
        />
        <GradientButton
          type='submit'
          className={authClasses.button}
        >
          Sign Up
        </GradientButton>
        <Typography
          variant='body2'
          color='textSecondary'
          className={classes.footer}
        >
          Have an Account?
          <LinkButton
            href={LINKS.SIGN_IN.HREF}
            className={classes.signIn}
          >
            Log In
          </LinkButton>
        </Typography>
      </form>
    </AuthWrapper>
  )
}

export default memo(SignUp)