import { memo, useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import * as jupiterAPI from 'services/api-jupiter'
import { IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths'

const useStyles = makeStyles((theme) => ({
  carousel: {
    position: 'relative',
    width: '100%',
    marginBottom: theme.spacing(5)
  },
  image: {
    width: '100%',
    height: 420,
    objectFit: 'cover',
    borderRadius: theme.spacing(1)
  },
  content: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(2),
    bottom: theme.spacing(3)
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 1,
    color: theme.custom.palette.white,
    marginBottom: theme.spacing(1)
  },
  text: {
    fontSize: 14,
    lineHeight: 1,
    color: theme.custom.palette.white,
  },
}));

const NFTCarousel = () => {
  const classes = useStyles();
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    getLatestGoods()
  }, [])

  const getLatestGoods = async () => {
    try {
      const params = {
        first: 0,
        last: 7
      }
      const { goods = [] } = await jupiterAPI.getDGSGoods(params);
      setGoods(goods)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Carousel
      infiniteLoop
      autoPlay={true}
      interval={1500}
      showStatus={false}
      showThumbs={false}
      showArrows={false}
      showIndicators={true}
      className={classes.carousel}
    >
      {
        goods.map((item, index) =>
          <div key={index}>
            <img
              alt='carousel'
              src={item.description || IMAGE_PLACEHOLDER_IMAGE_PATH}
              className={classes.image}
            />
            <div className={classes.content}>
              <Typography className={classes.title}>
                {item.name}
              </Typography>
            </div>
          </div>
        )
      }
    </Carousel>
  );
};

export default memo(NFTCarousel);