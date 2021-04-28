
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'

import { HEADER_BACKGROUND_IMAGE_PATH } from 'utils/constants/image-paths'
import { useCommonStyles } from 'styles/use-styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    minHeight: 280,
    backgroundImage: `url(${HEADER_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: 'bottom',
    backgroundSize: 'cover',
    padding: theme.spacing(10, 0),
    marginBottom: -theme.spacing(8),
  },
  header: {
    fontSize: 48,
    textTransform: 'uppercase',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
    },
  }
}));

const ImageWall = ({
  header,
  description,
  className,
  classes: propsClasses = {
    header: {}
  }
}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <main className={clsx(classes.root, className)}>
      <div className={commonClasses.containerWidth}>
        <Typography
          variant='h3'
          color='textPrimary'
          align='center'
          className={clsx(classes.header, propsClasses.header)}
        >
          {header}
        </Typography>
        <Typography
          variant='h5'
          color='primary'
          align='center'
        >
          {description}
        </Typography>
      </div>
    </main>
  );
};

export default memo(ImageWall);
