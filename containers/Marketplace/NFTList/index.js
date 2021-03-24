
import { memo, useState, useEffect, useRef, useCallback } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import InfiniteScroll from 'react-infinite-scroll-component'
import { use100vh } from 'react-div-100vh'

import NoNFT from 'parts/NoNFT'
import PurchaseNFTDialog from 'parts/PurchaseNFTDialog'
import NFTCard from '../NFTCard'
import { isEmpty } from 'utils/helpers/utility'

const useStyles = makeStyles((theme) => ({
  scroll: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden !important',
    overflowAnchor: 'none',
    padding: theme.spacing(2)
  },
  list: {
    width: '100%',
    maxWidth: theme.custom.layout.maxMarketPlaceWidth,
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

  return (
    isLast && isEmpty(goods)
      ? (
        <NoNFT />
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
            <Grid container spacing={3} className={classes.list} ref={scrollRef}>
              {
                goods.map((item, index) => (
                  <Grid key={index} item xs={12} sm={4} md={3} lg={2}>
                    <NFTCard
                      item={item}
                      onPurchase={purchaseHandler}
                    />
                  </Grid>
                ))
              }
            </Grid>
          </InfiniteScroll>
          {openPurchaseModal &&
            <PurchaseNFTDialog
              open={openPurchaseModal}
              setOpen={setOpenPurchaseModal}
              item={selectedGood}
            />
          }
        </>
      )
  )
}

export default memo(NFTList);