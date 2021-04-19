import { memo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import MaximizeIcon from 'components/Icons/MaximizeIcon'
import ProductContent from 'parts/ProductContent'
import FullImage from '../FullImage'

const useStyles = makeStyles((theme) => ({
  image: {
    height: 450,
    maxWidth: '100%',
    objectFit: 'contain',
    borderRadius: 16,
    border: `4px solid ${theme.palette.primary.main}`,
    [theme.breakpoints.down('xs')]: {
      height: 350,
    }
  },
  extendButton: {
    position: 'absolute',
    top: 0,
    right: 20,
  }
}));

const NFTImage = ({
  good
}) => {
  const classes = useStyles();

  const [fullScreen, setFullScreen] = useState(false);

  return (
    <>
      <ProductContent
        info={good}
        className={classes.image}
      />
      <MaximizeIcon
        onClick={() => setFullScreen(true)}
        className={classes.extendButton}
      />
      {
        fullScreen &&
        <FullImage
          good={good}
          open={fullScreen}
          setOpen={setFullScreen}
        />
      }
    </>
  )
}

export default memo(NFTImage)