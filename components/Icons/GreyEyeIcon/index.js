
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.spacing(2.5)
  }
}));

const GreyEyeIcon = ({
  className,
  viewBox,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <SvgIcon viewBox={viewBox || '0 0 20 18'} {...rest} className={clsx(classes.root, className)}>
      <path fill="#A2A1B3" fillRule="evenodd" d="M9.998 18C5.44 18 1.44 14.486.043 9.258c-.046-.17-.046-.347 0-.517C1.44 3.513 5.44 0 9.998 0s8.558 3.513 9.955 8.741c.046.17.046.347 0 .517C18.556 14.486 14.556 18 9.998 18zm0-16C6.43 2 3.262 4.801 2.045 8.999 3.262 13.198 6.43 16 9.998 16c3.567 0 6.736-2.802 7.953-7.001C16.734 4.801 13.565 2 9.998 2zm0 12c-2.638 0-4.784-2.244-4.784-5.001 0-2.756 2.146-5 4.784-5s4.784 2.244 4.784 5c0 2.757-2.146 5.001-4.784 5.001zm0-8c-.425 0-.824.111-1.184.295l.962 1.017c.38.401.363 1.034-.037 1.414-.194.183-.441.273-.687.273-.265 0-.529-.104-.725-.312l-.866-.915c-.157.376-.249.79-.249 1.227 0 1.655 1.25 3.001 2.786 3.001s2.786-1.346 2.786-3.001C12.784 7.345 11.534 6 9.998 6z" />
    </SvgIcon>
  )
}

export default memo(GreyEyeIcon);
