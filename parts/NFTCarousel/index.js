import { memo, useEffect, useState } from 'react'
import { Card, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

import * as jupiterAPI from 'services/api-jupiter'
import { IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths'
import { isEmpty } from 'utils/helpers/utility'

const useStyles = makeStyles((theme) => ({
  carousel: {
    width: '100%',
  },
  container: {
    height: 320,
    position: 'relative',
    margin: theme.spacing(2),
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 4,
  },
  content: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    bottom: 0
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 1,
    marginBottom: theme.spacing(1),
    color: theme.custom.palette.white
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
    !isEmpty(goods) &&
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
        goods.map((item, index) =>
          <Card key={index} className={classes.container}>
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
          </Card>
        )
      }
    </AliceCarousel>
  );
};

export default memo(NFTCarousel);