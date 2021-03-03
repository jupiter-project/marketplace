
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.spacing(2.5)
  }
}));

const GreyEyeCloseIcon = ({
  className,
  viewBox,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <SvgIcon viewBox={viewBox || '0 0 20 18'} {...rest} className={clsx(classes.root, className)}>
      <path fill="#a2a1b3" fillRule="evenodd" d="M19.74,8.33a1,1,0,0,0-1.41-.07c-5.59,5-11,5-16.66,0a1,1,0,0,0-1.42.08A1,1,0,0,0,.33,9.75a22.47,22.47,0,0,0,2.75,2.09L1.94,14a1,1,0,1,0,1.76.94l1.13-2.12a13.51,13.51,0,0,0,1.8.72l-.54,2.88a1,1,0,0,0,.79,1.17l.19,0a1,1,0,0,0,1-.81L8.59,14a11.3,11.3,0,0,0,1.42.1,11,11,0,0,0,1.4-.1L12,16.8a1,1,0,0,0,1,.81l.19,0a1,1,0,0,0,.79-1.17l-.54-2.89a13.43,13.43,0,0,0,1.8-.71l1.13,2.11A1,1,0,1,0,18.06,14l-1.14-2.14a21,21,0,0,0,2.75-2.11A1,1,0,0,0,19.74,8.33Z" />
    </SvgIcon>
  )
}

export default memo(GreyEyeCloseIcon);
