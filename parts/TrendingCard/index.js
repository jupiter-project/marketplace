
import { memo, useEffect, useState } from 'react'
import { Typography, Grid, Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import * as jupiterAPI from 'services/api-jupiter'
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
  leftContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  label: {
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: theme.spacing(2)
  },
  price: {
    fontSize: 24,
  }
}));

const TrendingCard = () => {
  const classes = useStyles();
  const [goodCount, setGoodCount] = useState(0)
  const [tagCount, setTagCount] = useState(0)
  const [purchaseCount, setPurchaseCount] = useState(0)

  useEffect(() => {
    const init = async () => {
      const { numberOfGoods = 0 } = await jupiterAPI.getDGSGoodsCount();
      setGoodCount(numberOfGoods);
      const { numberOfTags = 0 } = await jupiterAPI.getDGSTagCount();
      setTagCount(numberOfTags)
      const { numberOfPurchases = 0 } = await jupiterAPI.getDGSPurchaseCount();
      setPurchaseCount(numberOfPurchases)
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card className={classes.root}>
      <Grid container spacing={3} className={classes.itemContainer}>
        <Grid item xs={12} md={8} className={classes.chartContainer}>
          <TrendingChart />
        </Grid>
        <Grid item xs={12} md={4} className={classes.leftContainer}>
          <div className={classes.content}>

            <div className={classes.rowContainer}>
              <Typography
                className={classes.label}
              >
                Total NFT:
            </Typography>
              <Typography
                color='primary'
                className={classes.price}
              >
                {goodCount}
              </Typography>
            </div>
            <div className={classes.rowContainer}>
              <Typography
                className={classes.label}
              >
                Total Tag:
            </Typography>
              <Typography
                color='primary'
                className={classes.price}
              >
                {tagCount}
              </Typography>
            </div>
            <div className={classes.rowContainer}>
              <Typography
                className={classes.label}
              >
                Total Transactions:
            </Typography>
              <Typography
                color='primary'
                className={classes.price}
              >
                {purchaseCount}
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </Card>
  )
}

export default memo(TrendingCard)