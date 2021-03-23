
import { memo } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import MagicIdenticon from 'components/MagicIdenticon'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import { NQT_WEIGHT } from 'utils/constants/common'

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
  info: {
    marginLeft: theme.spacing(2)
  },
  name: {
    fontWeight: 'bold',
  },
  approve: {
    fontSize: 15,
    padding: theme.spacing(1, 1, 0.5),
  }
}));

const NFTPurchaseItem = ({
  item,
  onApprove
}) => {
  const classes = useStyles();

  return (
    <div className={classes.itemContainer}>
      <div className={classes.content}>
        <MagicIdenticon
          size={65}
          value={item.buyerRS}
        />
        <div className={classes.info}>
          <Typography
            variant='h5'
            color='textPrimary'
            className={classes.name}
          >
            {item.name}
          </Typography>
          <Typography color='primary'>
            {`${item.priceNQT / NQT_WEIGHT} JUP`}
          </Typography>
        </div>
      </div>
      <ContainedButton
        className={classes.approve}
        onClick={() => onApprove(item)}
      >
        APPROVE
      </ContainedButton>
    </div>
  )
}

export default memo(NFTPurchaseItem)