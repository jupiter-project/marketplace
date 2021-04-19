import { memo, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

import * as jupiterAPI from 'services/api-jupiter'
import NFTCarouselItem from './NFTCarouselItem'
import { isEmpty } from 'utils/helpers/utility'

const useStyles = makeStyles(() => ({
  carousel: {
    width: '100%',
  },
}));

const responsive = {
  480: { items: 1 },
  680: { items: 2 },
  960: { items: 3 },
  1280: { items: 4 }
}

const NFTCarousel = () => {
  const classes = useStyles();
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

  return (
    !isEmpty(openOrders) &&
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
          />
        )
      }
    </AliceCarousel>
  );
};

export default memo(NFTCarousel);