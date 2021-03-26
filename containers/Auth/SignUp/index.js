import { memo, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as jupiterAPI from 'services/api-jupiter'
import { setUserToken } from 'actions/auth'
import MagicCheckbox from 'components/UI/MagicCheckbox'
import GradientButton from 'components/UI/Buttons/GradientButton'
import LinkButton from 'components/UI/Buttons/LinkButton'
import MagicTextField from 'components/UI/TextFields/MagicTextField'
import AuthWrapper, { authPageStyles } from '../Shared/AuthWrapper'
import useLoading from 'utils/hooks/useLoading'
import usePopUp from 'utils/hooks/usePopUp'
import generatePassphrase from 'utils/helpers/generatePassphrase'
import LINKS from 'utils/constants/links'
import MESSAGES from 'utils/constants/messages'

const useStyles = makeStyles((theme) => ({
  alert: {
    marginBottom: theme.spacing(1)
  },
  check: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: theme.spacing(2.5)
  },
  checkText: {
    lineHeight: 1.5
  },
  link: {
    fontWeight: 'normal',
    color: theme.palette.primary.main
  },
  footer: {
    display: 'flex',
  },
  signIn: {
    paddingLeft: theme.spacing(1),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authClasses = authPageStyles();
  const router = useRouter();
  const { setPopUp } = usePopUp();
  const { changeLoadingStatus } = useLoading();

  const [agree, setAgree] = useState(false);
  const [newPassphrase, setNewPassphrase] = useState('');

  useEffect(() => {
    setNewPassphrase(generatePassphrase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const schema = yup.object().shape({
    passphrase: yup
      .string()
      .required('Please input field.')
      .oneOf([newPassphrase], 'Passphrase is not match.'),
  });

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(async (data) => {
    if (!agree) {
      setPopUp({ text: MESSAGES.TERMS_PRIVACY_CHECK })
      return;
    }

    changeLoadingStatus(true);
    try {
      const response = await jupiterAPI.getAccountByPassphrase(data.passphrase);
      if (!response?.accountRS) {
        setPopUp({ text: MESSAGES.AUTH_ERROR })
        changeLoadingStatus(false);
        return;
      }

      dispatch(setUserToken({
        accountRS: response.accountRS,
        user: response
      }));
      setPopUp({ text: MESSAGES.SIGN_UP_SUCCESS })
      router.push(LINKS.HOME.HREF);
    } catch (error) {
      console.log(error)
    }
    changeLoadingStatus(false);
  }, [agree, router, dispatch, setPopUp, changeLoadingStatus]);

  return (
    <AuthWrapper>
      <Typography
        variant='body2'
        color='primary'
        className={classes.alert}
      >
        This passphrase is very important. If you lose it, you will permanently
        lose access to your account, there is no way to recover it. Write it
        down carefully and store it in a safe place.
      </Typography>
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
          type='password'
          name='passphrase'
          label='Confirm Passphrase'
          error={errors.passphrase?.message}
          className={authClasses.input}
          control={control}
          defaultValue=''
        />
        <div className={classes.check}>
          <MagicCheckbox
            value={agree}
            size='medium'
            onChange={(event) => { setAgree(event.target.checked) }}
          />
          <Typography>
            {'I agree to '}
            <LinkButton
              href={LINKS.TERMS_OF_SERVICE.HREF}
              className={classes.link}
            >
              {LINKS.TERMS_OF_SERVICE.TITLE}
            </LinkButton>
            {', and '}
            <LinkButton
              href={LINKS.PRIVACY_POLICY.HREF}
              className={classes.link}
            >
              {LINKS.PRIVACY_POLICY.TITLE}
            </LinkButton>
          </Typography>
        </div>
        <GradientButton type='submit' className={authClasses.button}>
          Sign Up
        </GradientButton>
        <Typography
          variant='body2'
          color='textSecondary'
          className={classes.footer}
        >
          Already have an Account?
          <LinkButton href={LINKS.SIGN_IN.HREF} className={classes.signIn}>
            Log In
          </LinkButton>
        </Typography>
      </form>
    </AuthWrapper>
  );
};

export default memo(SignUp);
