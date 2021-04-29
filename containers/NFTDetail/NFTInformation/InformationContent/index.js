import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import { NQT_WEIGHT } from 'utils/constants/common'

const useStyles = makeStyles((theme) => ({
  name: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  accountName: {
    fontSize: 24,
    marginBottom: theme.spacing(3)
  },
  description: {
    fontSize: 16,
    marginBottom: theme.spacing(3)
  },
  accountRS: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 'fit-content',
    padding: theme.spacing(0.5, 2),
    borderRadius: theme.spacing(0.5),
    border: `2px dotted ${theme.palette.primary.main}`,
    marginBottom: theme.spacing(3)
  },
  price: {
    marginBottom: theme.spacing(1),
  },
}));

const InformationContent = ({
  good,
  account,
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
        color='textSecondary'
        className={classes.accountName}
      >
        {account.name || 'No Name'}
      </Typography>
      <Typography
        variant='h6'
        color='textSecondary'
        className={classes.description}
      >
        {assetInfo.description}
      </Typography>
      <Typography
        color='primary'
        className={classes.accountRS}
      >
        {good.accountRS}
      </Typography>
      <Typography
        color='textSecondary'
        className={classes.price}
      >
        {!good.priceNQT
          ? 'No Price'
          : `Price: ${good.priceNQT / NQT_WEIGHT} JUP`
        }
      </Typography>
    </>
  )
}

export default memo(InformationContent)