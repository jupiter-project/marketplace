import { memo, useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

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
    maxWidth: theme.custom.layout.maxDesktopWidth,
    marginBottom: theme.spacing(5)
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
    borderRadius: 2,
    border: `1px solid ${theme.custom.palette.border}`,
    backgroundColor: theme.palette.background.default,
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
  const [order, setOrder] = useState({})
  const [sellerAccount, setSellerAccount] = useState({})
  const [creatorAccount, setCreatorAccount] = useState({})
  const assetInfo = useMemo(() => getJSONParse(good.message), [good]);

  useEffect(() => {
    const getAssetInfo = async () => {
      let response = await jupiterAPI.getTransaction(router.query.goods);
      if (response?.errorCode) {
        setPopUp({ text: MESSAGES.GET_NFT_ERROR })
        return;
      }

      const { accountAssets = [] } = await jupiterAPI.getAssetAccounts(router.query.goods);
      if (isEmpty(accountAssets)) {
        setPopUp({ text: MESSAGES.GET_NFT_ERROR })
        return;
      }

      console.log(response)
      const { senderRS, attachment = {}, timestamp } = response;
      let info = {
        ...attachment,
        asset: router.query.goods,
        creatorRS: senderRS,
        accountRS: accountAssets[0].accountRS,
        priceNQT: 0,
        timestamp
      }

      const { askOrders = [] } = await jupiterAPI.getAskOrders(router.query.goods);
      if (!isEmpty(askOrders)) {
        setOrder(askOrders[0])
        const { priceNQT, order, type } = askOrders[0];
        info = {
          ...info,
          order,
          type,
          priceNQT
        }
      }
      setGood(info)
    }

    if (router.query.goods) {
      getAssetInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  useEffect(() => {
    const getAccounts = async () => {
      let response = await jupiterAPI.getAccount(good.accountRS);
      setSellerAccount(response)

      response = await jupiterAPI.getAccount(good.creatorRS);
      setCreatorAccount(response)
    }

    if (!isEmpty(good)) {
      getAccounts()
    }
  }, [good])

  return (
    <main className={classes.root}>
      <ImageWall header='NFT Details' />
      {isEmpty(good)
        ? (
          <NoData />
        ) : (
          <>
            <Grid container spacing={5} className={classes.container}>
              <Grid item xs={12} sm={6} md={5}>
                <a href={assetInfo.image} target='_blank' rel='noreferrer'>
                  <div className={classes.imageContainer}>
                    <ProductContent
                      info={assetInfo}
                      className={classes.image}
                    />
                  </div>
                </a>
                <Typography color='textSecondary'>
                  Click on the image to open the original file
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={7}>
                <NFTInformation
                  isMine={accountRS === good.accountRS}
                  good={good}
                  order={order}
                  sellerAccount={sellerAccount}
                  creatorAccount={creatorAccount}
                  assetInfo={assetInfo}
                />
                <AssetBids
                  isMine={accountRS === good.accountRS}
                  good={good}
                />
              </Grid>
            </Grid>
            <SellerNFTs account={good.accountRS} />
          </>
        )
      }
    </main>
  )
}

export default memo(NFTDetail)