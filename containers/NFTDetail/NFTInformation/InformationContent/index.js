import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import { NQT_WEIGHT } from 'utils/constants/common'
import { getDateFromTimestamp } from 'utils/helpers/getTimestamp'

const useStyles = makeStyles((theme) => ({
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  },
  description: {
    fontSize: 16,
    marginBottom: theme.spacing(3)
  },
  container: {
    marginBottom: theme.spacing(3)
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  accountName: {
    fontSize: 14,
  },
  accountDescription: {
    fontSize: 14,
  },
  accountRS: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
  },
}));

const InformationContent = ({
  good,
  sellerAccount,
  creatorAccount,
  assetInfo
}) => {
  const classes = useStyles();

  return (
    <>
      <Typography
        variant='h4'
        color='textPrimary'
        className={classes.name}
      >
        {good.description}
      </Typography>
      <Typography
        variant='h6'
        color='textSecondary'
        className={classes.description}
      >
        {assetInfo.description}
      </Typography>

      <div className={classes.container}>
        <Typography
          color='textPrimary'
          className={classes.label}
        >
          CREATOR INFO
        </Typography>
        <Typography
          color='primary'
          className={classes.accountRS}
        >
          {creatorAccount.accountRS}
        </Typography>
        <Typography
          color='textSecondary'
          className={classes.accountName}
        >
          {creatorAccount.name || 'No Name'}
        </Typography>
        {creatorAccount?.description &&
          <Typography
            color='textSecondary'
            className={classes.accountDescription}
          >
            {creatorAccount.description}
          </Typography>
        }
        <Typography
          color='textSecondary'
          className={classes.accountName}
        >
          {`DATE OF CREATION: ${getDateFromTimestamp(good.timestamp)}`}
        </Typography>
      </div>

      <div className={classes.container}>
        <Typography
          color='textPrimary'
          className={classes.label}
        >
          SELLER INFO
        </Typography>
        <Typography
          color='primary'
          className={classes.accountRS}
        >
          {sellerAccount.accountRS}
        </Typography>
        <Typography
          color='textSecondary'
          className={classes.accountName}
        >
          {sellerAccount.name || 'No Name'}
        </Typography>
        {sellerAccount?.description &&
          <Typography
            color='textSecondary'
            className={classes.accountDescription}
          >
            {sellerAccount.description}
          </Typography>
        }
      </div>

      <div className={classes.container}>
        <Typography
          color='textPrimary'
          className={classes.label}
        >
          PRICE
        </Typography>
        <Typography
          color='textSecondary'
          className={classes.price}
        >
          {!good.priceNQT
            ? 'No Price'
            : `${good.priceNQT / NQT_WEIGHT} JUP`
          }
        </Typography>
      </div>
    </>
  )
}

export default memo(InformationContent)