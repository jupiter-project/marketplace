import { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Logo from "components/Logo";
import FacebookIcon from 'components/Icons/FacebookIcon'
import TwitterIcon from 'components/Icons/TwitterIcon'
import InstagramIcon from 'components/Icons/InstagramIcon'
import LinkButton from "components/UI/Buttons/LinkButton";
import { SUPPORT_EMAIL } from "utils/constants/contact";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
  },
  email: {
    fontSize: 18,
    fontWeight: 600,
    marginTop: theme.spacing(1.5),
    color: theme.palette.primary.main,
    textDecoration: "unset",
  },
  socialContainer: {
    margin: theme.spacing(2.5, 0)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  }
}));

const FooterContact = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Logo />
      <LinkButton
        color="primary"
        href={`mailto:${SUPPORT_EMAIL}`}
        className={classes.email}
      >
        {SUPPORT_EMAIL}
      </LinkButton>
      <div className={classes.socialContainer}>
        <FacebookIcon className={classes.socialIcon} />
        <TwitterIcon className={classes.socialIcon} />
        <InstagramIcon className={classes.socialIcon} />
      </div>
    </div>
  );
};

export default memo(FooterContact);
