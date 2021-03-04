
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import FooterMenu from './FooterMenu'
import FooterContact from './FooterContact'
import { useCommonStyles } from 'styles/use-styles'
import { FOOTER_BACKGROUND_IMAGE_PATH } from 'utils/constants/image-paths'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    backgroundImage: `url(${FOOTER_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: 'bottom',
    backgroundSize: 'cover'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: theme.custom.palette.blue,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    }
  }
}));

const Footer = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <footer className={classes.root}>
      <div className={clsx(classes.container, commonClasses.containerWidth)}>
        <FooterContact />
        <FooterMenu />
      </div>
    </footer>
  );
};

export default memo(Footer);
