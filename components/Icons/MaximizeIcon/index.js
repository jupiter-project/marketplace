
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  IconButton,
  SvgIcon
} from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    width: 45,
    height: 45,
    border: `1px solid ${theme.palette.text.secondary}`,
  },
  svg: {
    width: theme.spacing(2.5),
  }
}));

const MaximizeIcon = ({
  className,
  viewBox,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <IconButton
      color='primary'
      aria-label='back'
      className={clsx(classes.root, className)}
      {...rest}
    >
      <SvgIcon viewBox={viewBox || '0 0 20 20'} className={classes.svg}>
        <path fill="#a2a1b2" fillRule="evenodd" d="M19 9c-.552 0-1-.448-1-1V3.414l-5.293 5.293C12.512 8.902 12.256 9 12 9c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.024 0-1.414L16.586 2H12c-.552 0-1-.448-1-1s.448-1 1-1h7c.13 0 .26.027.382.077.244.101.439.296.541.54.05.123.077.252.077.383v7c0 .552-.448 1-1 1zM3.414 18H8c.552 0 1 .447 1 1 0 .552-.448 1-1 1H1c-.13 0-.26-.027-.382-.077-.245-.102-.44-.297-.541-.541C.026 19.26 0 19.13 0 19v-7c0-.552.448-1 1-1s1 .448 1 1v4.586l5.293-5.293c.39-.391 1.023-.391 1.414 0 .391.39.391 1.023 0 1.414L3.414 18z" />
      </SvgIcon>
    </IconButton>
  )
}

export default memo(MaximizeIcon);
