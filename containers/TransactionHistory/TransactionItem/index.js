
import { memo, useEffect, useState } from 'react'
import { Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AccessTimeIcon from '@material-ui/icons/AccessTime'

import * as jupiterAPI from 'services/api-jupiter'
import MagicIdenticon from 'components/MagicIdenticon'
import { NQT_WEIGHT } from 'utils/constants/common'
import { IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths';
import { getDateFromTimestamp } from 'utils/helpers/getTimestamp'

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    marginBottom: theme.spacing(3),
  },
  image: {
    width: '100%',
    minHeight: 320,
    objectFit: 'cover',
    borderRadius: 8,
    border: `1px solid ${theme.palette.primary.main}`,
    [theme.breakpoints.down('sm')]: {
      minHeight: 210
    }
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
  name: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
  },
  quantity: {
    fontSize: 18,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  infoContainer: {
    marginLeft: theme.spacing(1)
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold'
  }
}));

const TransactionItem = ({
  item
}) => {
  const classes = useStyles();
  const [good, setGood] = useState({})

  useEffect(() => {
    const getDGSGood = async () => {
      const response = await jupiterAPI.getDGSGood(item.goods);
      setGood(response)
    }
    getDGSGood();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid container spacing={3} className={classes.itemContainer}>
      <Grid item xs={12} sm={5}>
        <img
          alt='nft-token'
          src={good.description || IMAGE_PLACEHOLDER_IMAGE_PATH}
          className={classes.image}
        />
      </Grid>
      <Grid item xs={12} sm={7} className={classes.leftContainer}>
        <div className={classes.content}>
          <Typography
            variant='h5'
            color='textPrimary'
            className={classes.name}
          >
            {item.name}
          </Typography>

          <div className={classes.rowContainer}>
            <Typography
              color='primary'
              className={classes.price}
            >
              {item.priceNQT / NQT_WEIGHT} JUP
            </Typography>
            <Typography
              color='textSecondary'
              className={classes.quantity}
            >
              {`x ${item.quantity}`}
            </Typography>
          </div>

          <div className={classes.rowContainer}>
            <MagicIdenticon
              size={65}
              value={item.sellerRS}
            />
            <div className={classes.infoContainer}>
              <Typography
                color='textPrimary'
                className={classes.label}
              >
                Seller
              </Typography>
              <Typography color='primary'>
                {item.sellerRS}
              </Typography>
            </div>
          </div>

          <div className={classes.rowContainer}>
            <MagicIdenticon
              size={65}
              value={item.buyerRS}
            />
            <div className={classes.infoContainer}>
              <Typography
                color='textPrimary'
                className={classes.label}
              >
                Buyer
              </Typography>
              <Typography color='primary'>
                {item.buyerRS}
              </Typography>
            </div>
          </div>

          <div className={classes.rowContainer}>
            <AccessTimeIcon />
            <Typography
              color='textPrimary'
              className={classes.date}
            >
              {`Purchased on ${getDateFromTimestamp(item.timestamp)}`}
            </Typography>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

export default memo(TransactionItem)