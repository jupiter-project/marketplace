import { memo, useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import * as jupiterAPI from 'services/api-jupiter'
import NoData from 'parts/NoData'
import ImageWall from 'parts/ImageWall'
import ProductContent from 'parts/ProductContent'
import NFTInformation from './NFTInformation'
import AssetBids from './AssetBids'
import SellerNFTs from './SellerNFTs'
import usePopUp from 'utils/hooks/usePopUp'
import MESSAGES from 'utils/constants/messages'
import { isEmpty } from 'utils/helpers/utility'
import getJSONParse from 'utils/helpers/getJSONParse'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: theme.palette.background.default,
    maxWidth: theme.custom.layout.maxDesktopWidth,
    marginBottom: theme.spacing(5)
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
    borderRadius: 2,
    border: `1px solid ${theme.palette.text.primary}`,
    marginBottom: theme.spacing(1)
  },
  image: {
    height: 480,
    maxWidth: '100%',
    objectFit: 'contain',
    [theme.breakpoints.down('xs')]: {
      height: 350,
    }
  },
}));

const NFTDetail = () => {
  const classes = useStyles();
  const router = useRouter();
  const { setPopUp } = usePopUp();

  const { accountRS } = useSelector(state => state.auth);
  const [good, setGood] = useState({})
  const [account, setAccount] = useState({})
  const assetInfo = useMemo(() => getJSONParse(good.message), [good]);

  useEffect(() => {
    const getAskOrder = async () => {
      const response = await jupiterAPI.getAskOrder(router.query.goods);
      if (response?.errorCode) {
        setPopUp({ text: MESSAGES.GET_NFT_ERROR })
        return;
      }

      setGood(response)
    }

    if (router.query.goods) {
      getAskOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  useEffect(() => {
    const getAccount = async () => {
      const response = await jupiterAPI.getAccount(good.accountRS);

      setAccount(response)
    }

    if (!isEmpty(good)) {
      getAccount()
    }
  }, [good])

  return (
    <main className={classes.root}>
      <ImageWall header='NFT Token Detail' />
      {isEmpty(good)
        ? (
          <NoData />
        ) : (
          <Grid container spacing={5} className={classes.container}>
            <Grid item xs={12} sm={6} md={5}>
              <div className={classes.imageContainer}>
                <ProductContent
                  info={assetInfo}
                  className={classes.image}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={7}>
              <NFTInformation
                isMine={accountRS === good.accountRS}
                good={good}
                account={account}
                assetInfo={assetInfo}
              />
              <AssetBids
                isMine={accountRS === good.accountRS}
                good={good}
              />
            </Grid>
          </Grid>
        )
      }
      <SellerNFTs account={good.accountRS} />
    </main>
  )
}

export default memo(NFTDetail)