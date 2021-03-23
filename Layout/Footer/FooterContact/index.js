import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Logo from 'components/Logo'
import TelegramIcon from 'components/Icons/TelegramIcon'
import TwitterIcon from 'components/Icons/TwitterIcon'
import DiscordIcon from 'components/Icons/DiscordIcon'
import LinkButton from 'components/UI/Buttons/LinkButton'
import { SUPPORT_EMAIL } from 'utils/constants/contact'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
  },
  email: {
    fontSize: 18,
    fontWeight: 600,
    marginTop: theme.spacing(1.5),
    color: theme.palette.background.default,
    textDecoration: 'unset',
  },
  socialContainer: {
    margin: theme.spacing(2.5, 0)
  },
  socialIcon: {
    marginRight: theme.spacing(2)
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
      <div className={classes.socialContainer}>
        <TwitterIcon className={classes.socialIcon} />
        <TelegramIcon className={classes.socialIcon} />
        <DiscordIcon className={classes.socialIcon} />
      </div>
    </div>
  );
};

export default memo(FooterContact);
