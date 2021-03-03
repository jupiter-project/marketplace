
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import Logo from 'components/Logo'
import LinkButton from 'components/UI/Buttons/LinkButton'
import {
  PHONE_NUMBER,
  SUPPORT_EMAIL
} from 'utils/constants/contact'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2)
  },
  phone: {
    fontSize: 18,
    fontWeight: 600,
    marginTop: theme.spacing(1.5)
  },
  email: {
    fontSize: 14,
    fontWeight: 600,
    marginTop: theme.spacing(1.5),
    color: theme.palette.primary.main,
    textDecoration: 'unset'
  }
}));

const FooterContact = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Logo />
      <LinkButton
        color='primary'
        href={`mailto:${SUPPORT_EMAIL}`}
        className={classes.email}
      >
        {SUPPORT_EMAIL}
      </LinkButton>
      <Typography
        variant='caption'
        color='primary'
        className={classes.phone}
      >
        {PHONE_NUMBER}
      </Typography>
    </div>
  );
};

export default memo(FooterContact);
