
import { memo, useState, useEffect, useRef, useCallback } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import InfiniteScroll from 'react-infinite-scroll-component'
import { use100vh } from 'react-div-100vh'

import * as jupiterAPI from 'services/api-jupiter'
import PurchaseNFTDialog from 'parts/PurchaseNFTDialog'
import NFTCard from './NFTCard'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden !important',
    overflowAnchor: 'none',
    padding: theme.spacing(4, 0)
  },
  list: {
    width: '100%',
    maxWidth: theme.custom.layout.maxMarketPlaceWidth,
    padding: theme.spacing(2)
  },
  loading: {
    fontWeight: 'bold'
  }
}));

const PAGE_COUNT = 8;

const Marketplace = () => {
  const classes = useStyles();
  const scrollRef = useRef(null);
  const deviceHeight = use100vh();

  const [goods, setGoods] = useState([]);
  const [first, setFirst] = useState(0);
  const [isLast, setIsLast] = useState(false)
  const [selectedGood, setSelectedGood] = useState({});
  const [openPurchaseModal, setOpenPurchaseModal] = useState(false);

  useEffect(() => {
    getDGSGoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLast && scrollRef?.current?.scrollHeight < deviceHeight) {
      getDGSGoods()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDGSGoods = useCallback(async () => {
    try {
      if (!isLast) {
        const params = {
          first,
          last: first + PAGE_COUNT - 1
        }

        const { goods = [] } = await jupiterAPI.getDGSGoods(params);
        setGoods((prev) => [...prev, ...goods]);
        setFirst((prev) => prev + goods.length);
        setIsLast(goods.length < PAGE_COUNT);
      }
    } catch (error) {
      console.log(error)
    }
  }, [isLast, first, setGoods, setFirst, setIsLast])

  const purchaseHandler = useCallback((item) => {
    setSelectedGood(item)
    setOpenPurchaseModal(true)
  }, [setSelectedGood, setOpenPurchaseModal])

  return (
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
      next={getDGSGoods}
      className={classes.container}
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

      {openPurchaseModal &&
        <PurchaseNFTDialog
          open={openPurchaseModal}
          setOpen={setOpenPurchaseModal}
          item={selectedGood}
        />
      }
    </InfiniteScroll>
  )
}

export default memo(Marketplace);