import { memo } from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  tabPanel: {
    width: '100%'
  },
}));

const TabPanel = ({
  children,
  value,
  index,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className={classes.tabPanel}
      {...rest}
    >
      {value === index && (
        <Box p={2}>
          {children}
        </Box>
      )}
    </div>
  )
};

export default memo(TabPanel)