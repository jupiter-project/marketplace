import { memo, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  TableCell,
  TableRow,
} from '@material-ui/core'

import * as jupiterAPI from 'services/api-jupiter'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import BidNFTDialog from 'parts/BidNFTDialog'
import TableContainer from 'parts/Table/TableContainer'
import { isEmpty } from 'utils/helpers/utility'
import { NQT_WEIGHT } from 'utils/constants/common'

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: 'inherit',
  },
  title: {
    textTransform: 'uppercase',
    marginBottom: theme.spacing(2)
  },
  cell: {
    border: 'unset',
    padding: theme.spacing(1, 0)
  },
  button: {
    fontSize: 15,
    borderRadius: 2,
    padding: theme.spacing(0.25, 1.5, 0),
    marginTop: theme.spacing(1)
  }
}));

const columns = [
  { id: 'account', label: 'Maker', minWidth: 150 },
  { id: 'price', label: 'Amount', minWidth: 60 },
];

const AssetBids = ({
  good
}) => {
  const classes = useStyles();

  const [bids, setBids] = useState([]);
  const [openBidModal, setOpenBidModal] = useState(false);

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
      <Typography color='textPrimary' className={classes.title}>
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
                <TableCell component='th' scope='row' className={classes.cell}>
                  {bid.accountRS}
                </TableCell>
                <TableCell className={classes.cell}>
                  {bid.priceNQT / NQT_WEIGHT} JUP
                </TableCell>
              </TableRow>
            ))}
          </TableContainer>
        )}

      <ContainedButton
        className={classes.button}
        onClick={() => setOpenBidModal(true)}
      >
        Place a bid
      </ContainedButton>

      {openBidModal &&
        <BidNFTDialog
          item={good}
          open={openBidModal}
          setOpen={setOpenBidModal}
        />
      }
    </div>
  )
}

export default memo(AssetBids)