
import { memo, useMemo } from 'react'
import { Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AccessTimeIcon from '@material-ui/icons/AccessTime'

import MagicIdenticon from 'components/MagicIdenticon'
import { NQT_WEIGHT } from 'utils/constants/common'
import { FILE_TYPES } from 'utils/constants/file-types'
import { IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths';
import { getDateFromTimestamp } from 'utils/helpers/getTimestamp'
import getJSONParse from 'utils/helpers/getJSONParse'

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    marginBottom: theme.spacing(3),
  },
  image: {
    width: '100%',
    minHeight: 240,
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
  const info = useMemo(() => getJSONParse(item?.message), [item]);

  return (
    <Grid container spacing={3} className={classes.itemContainer}>
      <Grid item xs={12} sm={5}>
        {info?.type === FILE_TYPES.VIDEO.VALUE
          ? (
            <video autoPlay loop controls className={classes.image}>
              <source src={info?.image} />
            </video>
          ) : (
            <img
              alt='image'
              src={info?.image || IMAGE_PLACEHOLDER_IMAGE_PATH}
              className={classes.image}
            />
          )
        }
      </Grid>
      <Grid item xs={12} sm={7} className={classes.leftContainer}>
        <div className={classes.content}>
          <Typography
            variant='h5'
            color='textPrimary'
            className={classes.name}
          >
            {item.description}
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
              {`x ${item.quantityQNT}`}
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