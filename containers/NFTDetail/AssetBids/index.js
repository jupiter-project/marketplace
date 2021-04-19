import { memo, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  TableCell,
  TableRow,
} from '@material-ui/core'

import * as jupiterAPI from 'services/api-jupiter'
import TableContainer from 'parts/Table/TableContainer'
import { isEmpty } from 'utils/helpers/utility'
import { NQT_WEIGHT } from 'utils/constants/common'

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: 'overlay'
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  approve: {
    fontSize: 15,
    padding: theme.spacing(1, 1, 0.5),
  }
}));

const columns = [
  { id: 'account', label: 'Account', minWidth: 150 },
  { id: 'type', label: 'Type', minWidth: 60 },
  { id: 'quantity', label: 'Quantity', minWidth: 60 },
  { id: 'price', label: 'Price', minWidth: 60 },
];

const AssetBids = ({
  good
}) => {
  const classes = useStyles();

  const [bids, setBids] = useState([]);

  useEffect(() => {
    const getBidOrders = async () => {
      const { bidOrders = [] } = await jupiterAPI.getBidOrders(good.asset);
      setBids(bidOrders)
    }

    if (!isEmpty(good)) {
      getBidOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [good])

  return (
    <div className={classes.root}>
      <Typography color='primary' className={classes.title}>
        Bids
      </Typography>
      {isEmpty(bids)
        ? (
          <Typography variant='h5' color='textSecondary'>
            No Bid
          </Typography>
        ) : (
          <TableContainer columns={columns}>
            {bids.map((bid) => (
              <TableRow key={bid.order}>
                <TableCell component='th' scope='row'>
                  {bid.accountRS}
                </TableCell>
                <TableCell>
                  BID
                </TableCell>
                <TableCell>
                  {bid.quantityQNT}
                </TableCell>
                <TableCell>
                  {bid.priceNQT / NQT_WEIGHT} JUP
                </TableCell>
              </TableRow>
            ))}
          </TableContainer>
        )}
    </div>
  )
}

export default memo(AssetBids)