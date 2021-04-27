
import { memo, useMemo } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ProductContent from 'parts/ProductContent'
import { NQT_WEIGHT } from 'utils/constants/common'
import { getDateFromTimestamp } from 'utils/helpers/getTimestamp'
import getJSONParse from 'utils/helpers/getJSONParse'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
    borderRadius: 2,
    border: `1px solid ${theme.palette.text.primary}`,
    marginRight: theme.spacing(2),
  },
  image: {
    width: 135,
    height: 135,
    objectFit: 'contain',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: theme.spacing(1.5)
  },
  price: {
    marginBottom: theme.spacing(1.5),
  },
  rowContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    width: 80
  },
  value: {
    fontSize: 14,
  }
}));

const TransactionItem = ({
  item
}) => {
  const classes = useStyles();
  const info = useMemo(() => getJSONParse(item?.message), [item]);

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <ProductContent
          info={info}
          className={classes.image}
        />
      </div>
      <div className={classes.infoContainer}>
        <Typography
          color='textPrimary'
          className={classes.name}
        >
          {item.description}
        </Typography>

        <div className={clsx(classes.rowContainer, classes.price)}>
          <Typography
            color='textSecondary'
            className={classes.label}
          >
            Price:
          </Typography>
          <Typography
            color='textSecondary'
            className={classes.value}
          >
            {item.priceNQT / NQT_WEIGHT} JUP
          </Typography>
        </div>

        <div className={classes.rowContainer}>
          <Typography
            color='textSecondary'
            className={classes.label}
          >
            Seller
          </Typography>
          <Typography
            color='primary'
            className={classes.value}
          >
            {item.sellerRS}
          </Typography>
        </div>

        <div className={classes.rowContainer}>
          <Typography
            color='textSecondary'
            className={classes.label}
          >
            Buyer
          </Typography>
          <Typography
            color='primary'
            className={classes.value}
          >
            {item.buyerRS}
          </Typography>
        </div>

        <div className={classes.rowContainer}>
          <Typography
            color='textSecondary'
            className={classes.label}
          >
            Date
          </Typography>
          <Typography
            color='textSecondary'
            className={classes.value}
          >
            {getDateFromTimestamp(item.timestamp)}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default memo(TransactionItem)