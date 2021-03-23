import { memo, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Tab,
  Tabs,
  Hidden,
} from '@material-ui/core'

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  tabs: {
    maxWidth: 200,
    width: '100%',
    borderRight: `2px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 40
    }
  },
  tab: {
    fontSize: 18,
    margin: theme.spacing(1, 0),
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
      minWidth: 40,
      minHeight: 40
    }
  },
  selected: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  indicator: {
    backgroundColor: theme.palette.primary.main,
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
            label={<Hidden smDown> {item.label} </Hidden>}
            icon={<item.icon />}
            className={classes.tab}
            classes={{
              selected: classes.selected
            }}
            {...a11yProps(index)}
          />
        ))
      }
    </Tabs>
  );
}

export default memo(VerticalTabs)
