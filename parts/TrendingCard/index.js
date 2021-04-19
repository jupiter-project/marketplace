
import { memo } from 'react'
import { Grid, Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import TrendingChart from './TrendingChart'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3)
  },
  itemContainer: {
    marginBottom: theme.spacing(3),
  },
  chartContainer: {
    height: 320,
  },
}));

const TrendingCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Grid container spacing={3} className={classes.itemContainer}>
        <Grid item xs={12} className={classes.chartContainer}>
          <TrendingChart />
        </Grid>
      </Grid>
    </Card>
  )
}

export default memo(TrendingCard)