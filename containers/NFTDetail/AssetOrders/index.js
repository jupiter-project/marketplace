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
    overflowX: 'inherit'
  },
  title: {
    marginBottom: theme.spacing(2)
  }
}));

const columns = [
  { id: 'account', label: 'Account', minWidth: 150 },
  { id: 'type', label: 'Type', minWidth: 60 },
  { id: 'quantity', label: 'Quantity', minWidth: 60 },
  { id: 'price', label: 'Price', minWidth: 60 },
];

const AssetOrders = ({
  good
}) => {
  const classes = useStyles();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getAskOrders = async () => {
      const { askOrders = [] } = await jupiterAPI.getAskOrders(good.asset);
      setOrders(askOrders)
    }

    if (!isEmpty(good)) {
      getAskOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [good])

  return (
    <div className={classes.root}>
      <Typography color='primary' className={classes.title}>
        Orders
      </Typography>
      {isEmpty(orders)
        ? (
          <Typography variant='h5' color='textSecondary'>
            No Order
          </Typography>
        ) : (
          <TableContainer columns={columns}>
            {orders.map((order) => (
              <TableRow key={order.order}>
                <TableCell component='th' scope='row'>
                  {order.accountRS}
                </TableCell>
                <TableCell>
                  ASK
                </TableCell>
                <TableCell>
                  {order.quantityQNT}
                </TableCell>
                <TableCell>
                  {order.priceNQT / NQT_WEIGHT} JUP
                </TableCell>
              </TableRow>
            ))}
          </TableContainer>
        )}
    </div>
  )
}

export default memo(AssetOrders)