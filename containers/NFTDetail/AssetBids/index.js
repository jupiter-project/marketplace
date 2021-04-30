import { memo, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
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
import usePopUp from 'utils/hooks/usePopUp'
import MESSAGES from 'utils/constants/messages'
import LINKS from 'utils/constants/links'

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: 'inherit',
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cell: {
    border: 'unset',
    padding: theme.spacing(1, 0)
  },
  button: {
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
  const router = useRouter();
  const { setPopUp } = usePopUp();

  const { accountRS } = useSelector(state => state.auth);
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

  const bidHandler = useCallback(() => {
    if (!accountRS) {
      setPopUp({ text: MESSAGES.AUTH_REQUIRED })
      router.push(LINKS.SIGN_IN.HREF)
      return;
    }
    setOpenBidModal(true)
  }, [accountRS, router, setPopUp, setOpenBidModal])

  return (
    <div className={classes.root}>
      <Typography color='textPrimary' className={classes.title}>
        Bids
      </Typography>
      {isEmpty(bids)
        ? (
          <Typography variant='body2' color='textSecondary'>
            No bids yet
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
        onClick={bidHandler}
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