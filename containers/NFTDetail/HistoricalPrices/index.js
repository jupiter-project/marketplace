import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  TableCell,
  TableRow,
} from '@material-ui/core'

import TableContainer from 'parts/Table/TableContainer'
import { isEmpty } from 'utils/helpers/utility'
import { NQT_WEIGHT } from 'utils/constants/common'

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: 'inherit',
    marginBottom: theme.spacing(1)
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cell: {
    border: 'unset',
    padding: theme.spacing(1, 0)
  },
}));

const columns = [
  { id: 'seller', label: 'Seller', minWidth: 150 },
  { id: 'buyer', label: 'Buyer', minWidth: 150 },
  { id: 'price', label: 'Price', minWidth: 60 },
];

const HistoricalPrices = ({
  trades
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography color='textPrimary' className={classes.title}>
        Historical Prices
      </Typography>
      {isEmpty(trades)
        ? (
          <Typography variant='body2' color='textSecondary'>
            No Transaction Histories
          </Typography>
        ) : (
          <TableContainer columns={columns}>
            {trades.map((trade, index) => (
              <TableRow key={index}>
                <TableCell component='th' scope='row' className={classes.cell}>
                  <Typography variant='body2' color='primary'>
                    {trade.sellerRS}
                  </Typography>
                </TableCell>
                <TableCell className={classes.cell}>
                  <Typography variant='body2' color='primary'>
                    {trade.buyerRS}
                  </Typography>
                </TableCell>
                <TableCell className={classes.cell}>
                  {trade.priceNQT / NQT_WEIGHT} JUP
                </TableCell>
              </TableRow>
            ))}
          </TableContainer>
        )}
    </div>
  )
}

export default memo(HistoricalPrices)