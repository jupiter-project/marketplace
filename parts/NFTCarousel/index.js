import { memo, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

import * as jupiterAPI from 'services/api-jupiter'
import NFTCarouselItem from './NFTCarouselItem'
import { isEmpty } from 'utils/helpers/utility'
import LINKS from 'utils/constants/links'

const useStyles = makeStyles((theme) => ({
  carousel: {
    width: '100%',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'CRC-LIGHT',
    textAlign: 'center',
    padding: theme.spacing(0, 2),
    margin: theme.spacing(16, 0, 8),
    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
      margin: theme.spacing(5, 0),
    },
  }
}));

const responsive = {
  480: { items: 1 },
  680: { items: 2 },
  960: { items: 4 },
  1280: { items: 5 },
  1480: { items: 6 },
  1800: { items: 7 }
}

const NFTCarousel = () => {
  const classes = useStyles();
  const router = useRouter();

  const [openOrders, setOpenOrders] = useState([]);

  useEffect(() => {
    searchAllOpenAskOrders()
  }, [])

  const searchAllOpenAskOrders = async () => {
    try {
      const params = {
        first: 0,
        last: 7
      }
      const { openOrders = [] } = await jupiterAPI.searchAllOpenAskOrders(params);
      setOpenOrders(openOrders)
    } catch (error) {
      console.log(error)
    }
  }

  const detailNFTHandler = useCallback((item) => {
    router.push(
      LINKS.NFT_DETAIL.HREF,
      LINKS.NFT_DETAIL.HREF.replace('[goods]', item.asset)
    )
  }, [router])

  return (
    !isEmpty(openOrders) &&
    <>
      <Typography variant='h1' className={classes.title}>
        NEW NFT SUBMISSIONS
      </Typography>
      <AliceCarousel
        mouseDragEnabled
        autoPlay
        infinite
        animationDuration={5000}
        responsive={responsive}
        disableButtonsControls
        disableDotsControls
        className={classes.carousel}
      >
        {
          openOrders.map((item, index) =>
            <NFTCarouselItem
              key={index}
              item={item}
              onDetail={detailNFTHandler}
            />
          )
        }
      </AliceCarousel>
    </>
  );
};

export default memo(NFTCarousel);