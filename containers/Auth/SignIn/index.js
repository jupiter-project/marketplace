
import { memo, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as jupiterAPI from "services/api-jupiter";
import { setUserToken } from 'actions/auth'
import GradientButton from 'components/UI/Buttons/GradientButton'
import LinkButton from 'components/UI/Buttons/LinkButton'
import AccountTextField from 'components/UI/TextFields/AccountTextField'
import MagicTextField from 'components/UI/TextFields/MagicTextField'
import AuthWrapper, { authPageStyles } from '../Shared/AuthWrapper'
import AuthTabs from './AuthTabs'
import useLoading from 'utils/hooks/useLoading'
import { showErrorToast, showSuccessToast } from 'utils/helpers/toast'
import LINKS from 'utils/constants/links'
import {
  ACCOUNT_VALID,
  PASSPHRASE_VALID
} from 'utils/constants/validations'
import MESSAGES from 'utils/constants/messages'
import LOGIN_METHODS from 'utils/constants/login-methods'
import TEXT_MASKS from 'utils/constants/text-masks'

const accountSchema = yup.object().shape({
  account: ACCOUNT_VALID
});

const passphraseSchema = yup.object().shape({
  passphrase: PASSPHRASE_VALID
});

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex'
  },
  signup: {
    paddingLeft: theme.spacing(1)
  }
}));

const SignIn = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const authClasses = authPageStyles();
  const router = useRouter();
  const { changeLoadingStatus } = useLoading();

  const [method, setMethod] = useState(LOGIN_METHODS.ACCOUNT);

  const schema = useMemo(() => {
    switch (method) {
      case LOGIN_METHODS.ACCOUNT:
        return accountSchema;
      case LOGIN_METHODS.PASSPHRASE:
        return passphraseSchema;
      default:
        return accountSchema;
    }
  }, [method]);

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    changeLoadingStatus(true)
    try {
      let response;
      if (method === LOGIN_METHODS.ACCOUNT) {
        response = await jupiterAPI.getAccountByAccountID(data.account);
      }

      if (method === LOGIN_METHODS.PASSPHRASE) {
        response = await jupiterAPI.getAccountByPassphrase(data.passphrase);
      }

      if (!response?.accountRS) {
        showErrorToast(MESSAGES.AUTH_ERROR)
        changeLoadingStatus(false);
        return;
      }

      dispatch(setUserToken({
        accountRS: response.accountRS,
        user: response
      }));
      showSuccessToast(MESSAGES.SIGN_IN_SUCCESS)
      router.push(LINKS.DASHBOARD.HREF)
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
      <AuthTabs
        method={method}
        setMethod={setMethod}
      />
      <form
        noValidate
        className={authClasses.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        {
          method === LOGIN_METHODS.ACCOUNT
            ? (
              <Controller
                as={<AccountTextField />}
                name='account'
                label='Account'
                mask={TEXT_MASKS.ACCOUNT}
                error={errors.account?.message}
                className={authClasses.input}
                control={control}
                defaultValue='JUP-'
              />
            ) : (
              <Controller
                as={<MagicTextField />}
                multiline
                name='passphrase'
                label='Passphrase'
                error={errors.passphrase?.message}
                className={authClasses.input}
                control={control}
                defaultValue=''
              />
            )
        }
        <GradientButton
          type='submit'
          className={authClasses.button}
        >
          Log In
        </GradientButton>
        <Typography
          variant='body2'
          color='textSecondary'
          className={classes.footer}
        >
          {"Don't have an Account?"}
          <LinkButton
            href={LINKS.SIGN_UP.HREF}
            className={classes.signup}
          >
            Create New Account
          </LinkButton>
        </Typography>
      </form>
    </AuthWrapper>
  )
}

export default memo(SignIn)