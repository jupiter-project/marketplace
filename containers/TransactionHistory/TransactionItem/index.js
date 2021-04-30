
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
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      alignItems: 'flex-start',
      flexDirection: 'column'
    },
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
    borderRadius: 2,
    border: `1px solid ${theme.custom.palette.border}`,
    backgroundColor: theme.palette.background.default,
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
  image: {
    width: 135,
    height: 135,
    objectFit: 'contain'
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: 153
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
          <div>
            <Typography
              color='textSecondary'
              className={classes.label}
            >
              Price
            </Typography>
          </div>
          <Typography
            color='textSecondary'
            className={classes.value}
          >
            {item.priceNQT / NQT_WEIGHT} JUP
          </Typography>
        </div>

        <div>
          <div className={classes.rowContainer}>
            <div>
              <Typography
                color='textSecondary'
                className={classes.label}
              >
                Seller
              </Typography>
            </div>
            <Typography
              color='primary'
              className={classes.value}
            >
              {item.sellerRS}
            </Typography>
          </div>

          <div className={classes.rowContainer}>
            <div>
              <Typography
                color='textSecondary'
                className={classes.label}
              >
                Buyer
            </Typography>
            </div>
            <Typography
              color='primary'
              className={classes.value}
            >
              {item.buyerRS}
            </Typography>
          </div>

          <div className={classes.rowContainer}>
            <div>
              <Typography
                color='textSecondary'
                className={classes.label}
              >
                Date
            </Typography>
            </div>
            <Typography
              color='textSecondary'
              className={classes.value}
            >
              {getDateFromTimestamp(item.timestamp)}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(TransactionItem)