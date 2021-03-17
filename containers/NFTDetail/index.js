import { memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

import * as jupiterAPI from 'services/api-jupiter'
import MagicIdenticon from 'components/MagicIdenticon'
import GradientButton from 'components/UI/Buttons/GradientButton'
import ImageWall from 'parts/ImageWall'
import { showErrorToast } from 'utils/helpers/toast'
import MESSAGES from 'utils/constants/messages'
import { NQT_WEIGHT } from 'utils/constants/common'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    width: '100%',
    maxWidth: theme.custom.layout.maxDesktopWidth,
    padding: theme.spacing(8, 3),
  },
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
  imageContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  rightContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  name: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2)
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  quantity: {
    fontSize: 20,
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(3),
  },
  tag: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    cursor: 'pointer',
    color: theme.custom.palette.white,
    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.custom.palette.black})`,
    padding: theme.spacing(0.5, 2.5),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: 30,
    border: `2px solid ${theme.palette.primary.main}`,
  },
  sellerLabelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(1)
  },
  sellerLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: theme.spacing(2)
  },
  sellerRS: {
    fontSize: 14,
    fontWeight: 'bold',
    cursor: 'pointer',
    width: 'fit-content',
    padding: theme.spacing(0.5),
    borderRadius: theme.spacing(0.5),
    border: `2px dotted ${theme.palette.primary.main}`,
    marginBottom: theme.spacing(3)
  }
}));

const NFTDetail = () => {
  const classes = useStyles();
  const router = useRouter();

  const { accountRS } = useSelector(state => state.auth);
  const [good, setGood] = useState({})

  useEffect(() => {
    const getDGSGood = async () => {
      const response = await jupiterAPI.getDGSGood(router.query.goods);
      if (response?.errorCode) {
        showErrorToast(MESSAGES.GET_NFT_ERROR)
        return;
      }

      setGood(response)
    }

    if (router.query.goods) {
      getDGSGood();
    }
  }, [router.query])


  return (
    <main className={classes.root}>
      <ImageWall header='NFT Token Detail' />
      <div className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} md={8} className={classes.imageContainer}>
            <img
              src={good.description}
              alt='good production'
              className={classes.image}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} className={classes.rightContainer}>
            <div>
              <Typography variant='h4' color='textPrimary' className={classes.name}>
                {good.name}
              </Typography>
              <div className={classes.infoContainer}>
                <Typography color='primary' className={classes.price}>
                  {good.priceNQT / NQT_WEIGHT} JUP
              </Typography>
                <Typography color='textSecondary' className={classes.quantity}>
                  {`x ${good.quantity}`}
                </Typography>
              </div>
              <div className={classes.tagContainer}>
                {good?.parsedTags?.map((tag, index) => (
                  <Typography
                    key={index}
                    className={classes.tag}
                  >
                    {tag}
                  </Typography>
                ))}
              </div>
              <div className={classes.sellerLabelContainer}>
                <Typography color='textPrimary' className={classes.sellerLabel}>
                  Seller
                </Typography>
                <MagicIdenticon value={good.sellerRS} />
              </div>

              <Typography color='primary' className={classes.sellerRS}>
                {good.sellerRS}
              </Typography>
              {
                accountRS !== good.sellerRS &&
                <GradientButton
                  type='submit'
                  className={classes.button}
                >
                  Purchase Now
                </GradientButton>
              }
            </div>
          </Grid>
        </Grid>
      </div>
    </main>
  )
}

export default memo(NFTDetail)