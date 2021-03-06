
import { memo } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  tab: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    cursor: 'pointer'
  },
  activeText: {
    color: theme.palette.primary.main
  },
  bottomLine: {
    height: 4,
    width: '100%',
    marginTop: theme.spacing(1.5),
    backgroundColor: theme.custom.palette.border,
    borderRadius: 2
  },
  activeBottomLine: {
    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.custom.palette.yellow})`
  }
}));

const AuthTab = ({
  label,
  isActive = false,
  onTab
}) => {
  const classes = useStyles()

  return (
    <div className={classes.tab} onClick={onTab}>
      <Typography
        color='textSecondary'
        className={clsx({ [classes.activeText]: isActive })}
      >
        {label}
      </Typography>
      <div className={clsx(classes.bottomLine, { [classes.activeBottomLine]: isActive })} />
    </div>
  )
}

export default memo(AuthTab);