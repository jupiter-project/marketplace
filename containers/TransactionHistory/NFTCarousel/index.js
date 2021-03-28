import { memo } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

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

  return (
    <Carousel
      infiniteLoop
      autoPlay={true}
      interval={1500}
      showStatus={false}
      showThumbs={false}
      showArrows={true}
      showIndicators={true}
      className={classes.carousel}
    >
      {
        results.map((item, index) =>
          <div key={index}>
            <img
              alt='carousel'
              src={item.image || IMAGE_PLACEHOLDER_IMAGE_PATH}
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

const results = [
  {
    name: 'Figgis Monster',
    image: 'https://res.cloudinary.com/leda/image/upload/v1616865221/qq9jfrorpaaksco9kalo.jpg',
  },
  {
    name: 'Person and blue person',
    image: 'https://res.cloudinary.com/leda/image/upload/v1616050295/snbuvxdjtkw1wtskwtkx.webp',
  },
  {
    name: 'Circle Paper',
    image: 'https://res.cloudinary.com/leda/image/upload/v1616005042/swukxphauafllyfonpol.gif',
  },
  {
    name: 'Sky net on jupiter',
    image: 'https://res.cloudinary.com/leda/image/upload/v1616050409/vsyvk4amjjwqpfdp5r6w.gif',
  }
]