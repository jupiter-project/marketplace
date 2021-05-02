
import { memo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as jupiterAPI from 'services/api-jupiter'
import { setUserToken } from 'actions/auth'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import LinkButton from 'components/UI/Buttons/LinkButton'
import AccountTextField from 'components/UI/TextFields/AccountTextField'
import AuthWrapper, { authPageStyles } from '../Shared/AuthWrapper'
import useLoading from 'utils/hooks/useLoading'
import usePopUp from 'utils/hooks/usePopUp'
import LINKS from 'utils/constants/links'
import { ACCOUNT_VALID } from 'utils/constants/validations'
import MESSAGES from 'utils/constants/messages'
import TEXT_MASKS from 'utils/constants/text-masks'

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex'
  },
  signup: {
    paddingLeft: theme.spacing(1)
  }
}));

const schema = yup.object().shape({
  account: ACCOUNT_VALID
});

const SignIn = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const authClasses = authPageStyles();
  const router = useRouter();
  const { setPopUp } = usePopUp();
  const { changeLoadingStatus } = useLoading();

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = useCallback(async (data) => {
    changeLoadingStatus(true)
    try {
      const response = await jupiterAPI.getAccountByAccountID(data.account);
      if (!response?.accountRS) {
        setPopUp({ text: MESSAGES.AUTH_ERROR })
        changeLoadingStatus(false);
        return;
      }

      dispatch(setUserToken({
        accountRS: response.accountRS,
        user: response
      }));
      setPopUp({ text: MESSAGES.SIGN_IN_SUCCESS })
      router.push(LINKS.MARKETPLACE.HREF)
    } catch (error) {
      console.log(error)
    }
    changeLoadingStatus(false)
  }, [router, dispatch, setPopUp, changeLoadingStatus]);

  return (
    <AuthWrapper>
      <form
        noValidate
        className={authClasses.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          as={<AccountTextField />}
          name='account'
          label='JUP Address'
          placeholder='JUP-____-____-____-_____'
          mask={TEXT_MASKS.ACCOUNT}
          error={errors.account?.message}
          className={authClasses.input}
          control={control}
          defaultValue=''
        />
        <ContainedButton
          type='submit'
          className={authClasses.button}
        >
          Log In
        </ContainedButton>
        <Typography
          variant='body2'
          color='textSecondary'
          className={classes.footer}
        >
          {'Don\'t have an account?'}
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