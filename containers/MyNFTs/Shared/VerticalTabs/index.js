import { memo, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Tab, Tabs } from '@material-ui/core'

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  tabs: {
    maxWidth: 180,
    width: '100%',
    borderRight: `2px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('xs')]: {
      maxWidth: 80,
    },
  },
  tab: {
    fontSize: 18,
    fontWeight: 'bold',
    textDecoration: 'underline',
    textAlign: 'right',
    color: theme.palette.text.primary,
    padding: theme.spacing(0.5, 1, 0.5, 0),
    minHeight: 'unset',
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
  selected: {
    color: theme.palette.primary.main,
  },
  wrapper: {
    alignItems: 'flex-end'
  },
  indicator: {
    backgroundColor: 'unset',
  }
}));

const VerticalTabs = ({
  tabs,
  value,
  setValue
}) => {
  const classes = useStyles();

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, [setValue]);

  return (
    <Tabs
      orientation='vertical'
      variant='scrollable'
      value={value}
      onChange={handleChange}
      aria-label='Vertical tabs'
      className={classes.tabs}
      classes={{
        indicator: classes.indicator
      }}
    >
      {
        tabs.map((item, index) => (
          <Tab
            key={index}
            label={item}
            className={classes.tab}
            classes={{
              selected: classes.selected,
              wrapper: classes.wrapper
            }}
            {...a11yProps(index)}
          />
        ))
      }
    </Tabs>
  );
}

export default memo(VerticalTabs)
