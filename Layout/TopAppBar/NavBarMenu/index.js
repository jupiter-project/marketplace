
import { memo, useContext } from 'react'
import { Hidden } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { AccountContext } from 'context/AccountContext'
import GradientButton from 'components/UI/Buttons/GradientButton'
import OutlinedButton from 'components/UI/Buttons/OutlinedButton'
import LINKS from 'utils/constants/links'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    margin: theme.spacing(0, 1)
  }
}));

const NavBarMenu = () => {
  const classes = useStyles();
  const { account } = useContext(AccountContext);

  return (
    <Hidden smDown>
      <div className={classes.root}>
        <GradientButton
          href={LINKS.CREATE_COLLECT.HREF}
        >
          Create
        </GradientButton>
        {
          !!account &&
          <OutlinedButton
            href={LINKS.DASHBOARD.HREF}
            className={classes.button}
          >
            Dashboard
          </OutlinedButton>
        }
      </div>
    </Hidden>
  );
};

export default memo(NavBarMenu);