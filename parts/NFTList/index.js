
import { memo, useState, useEffect, useRef, useCallback } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import InfiniteScroll from 'react-infinite-scroll-component'
import { use100vh } from 'react-div-100vh'

import NoData from 'parts/NoData'
import PurchaseNFTDialog from 'parts/PurchaseNFTDialog'
import BidNFTDialog from 'parts/BidNFTDialog'
import NFTCard from './NFTCard'
import { isEmpty } from 'utils/helpers/utility'

const useStyles = makeStyles((theme) => ({
  scroll: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden !important',
    overflowAnchor: 'none',
    padding: theme.spacing(2, 0)
  },
  list: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    gridGap: theme.spacing(7, 5),
    width: '100%',
    maxWidth: theme.custom.layout.maxMarketPlaceWidth,
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
  loading: {
    fontWeight: 'bold',
    margin: theme.spacing(2, 0)
  }
}));

const NFTList = ({
  goods,
  isLast,
  loadMore
}) => {
  const classes = useStyles();
  const scrollRef = useRef(null);
  const deviceHeight = use100vh();

  const [selectedGood, setSelectedGood] = useState({});
  const [openPurchaseModal, setOpenPurchaseModal] = useState(false);
  const [openBidModal, setOpenBidModal] = useState(false);

  useEffect(() => {
    if (!isLast && scrollRef?.current?.scrollHeight < deviceHeight) {
      loadMore()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const purchaseHandler = useCallback((item) => {
    setSelectedGood(item)
    setOpenPurchaseModal(true)
  }, [setSelectedGood, setOpenPurchaseModal])

  const bidHandler = useCallback((item) => {
    setSelectedGood(item)
    setOpenBidModal(true)
  }, [setSelectedGood, setOpenBidModal])

  return (
    isLast && isEmpty(goods)
      ? (
        <NoData />
      ) : (
        <>
          <InfiniteScroll
            dataLength={goods.length}
            hasMore={!isLast}
            loader={
              <Typography
                variant='h6'
                color='primary'
                className={classes.loading}
              >
                Loading more
              </Typography>
            }
            next={loadMore}
            className={classes.scroll}
          >
            <div className={classes.list} ref={scrollRef}>
              {
                goods.map((item, index) => (
                  <NFTCard
                    key={index}
                    item={item}
                    onPurchase={purchaseHandler}
                    onBid={bidHandler}
                  />
                ))
              }
            </div>
          </InfiniteScroll>
          {openPurchaseModal &&
            <PurchaseNFTDialog
              open={openPurchaseModal}
              setOpen={setOpenPurchaseModal}
              item={selectedGood}
            />
          }
          {openBidModal &&
            <BidNFTDialog
              item={selectedGood}
              open={openBidModal}
              setOpen={setOpenBidModal}
            />
          }
        </>
      )
  )
}

export default memo(NFTList);