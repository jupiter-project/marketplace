import { memo, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import * as jupiterAPI from 'services/api-jupiter'
import { STATS_URL } from 'config'
import NoData from 'parts/NoData'
import ImageWall from 'parts/ImageWall'
import ProductContent from 'parts/ProductContent'
import NFTInformation from './NFTInformation'
import AssetBids from './AssetBids'
import SellerNFTs from './SellerNFTs'
import HistoricalPrices from './HistoricalPrices'
import { isEmpty } from 'utils/helpers/utility'
import getJSONParse from 'utils/helpers/getJSONParse'
import { SITE_URL } from 'utils/constants/common'

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

const NFTDetail = ({
  good,
  order
}) => {
  const classes = useStyles();
  const router = useRouter();

  const { accountRS } = useSelector(state => state.auth);
  const [sellerAccount, setSellerAccount] = useState({})
  const [creatorAccount, setCreatorAccount] = useState({})
  const [trades, setTrades] = useState([])
  const assetInfo = getJSONParse(good.message)

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const [
          sellerAccount,
          creatorAccount,
          trades,
        ] = await Promise.all([
          jupiterAPI.getAccount(good.accountRS),
          jupiterAPI.getAccount(good.creatorRS),
          jupiterAPI.getTrades(good.asset),
        ]);

        setSellerAccount(sellerAccount)
        setCreatorAccount(creatorAccount)
        setTrades(trades?.trades || [])
      } catch (error) {
        console.log(error)
      }
    }

    if (!isEmpty(good)) {
      getAccounts()
    }
  }, [good])

  return (
    <>
      <Head>
        <meta property='og:url' content={`${SITE_URL}${router.asPath}`} />
        <meta property='og:title' content={good.description} />
        <meta property='og:description' content={assetInfo.description} />
        <meta property='og:image' content={assetInfo.image} />

        <meta property='twitter:url' content={`${SITE_URL}${router.asPath}`} />
        <meta property='twitter:title' content={good.description} />
        <meta property='twitter:description' content={assetInfo.description} />
        <meta property='twitter:image' content={assetInfo.image} />
      </Head>
      <main className={classes.root}>
        <ImageWall header='NFT Details' />
        {isEmpty(good)
          ? (
            <NoData />
          ) : (
            <>
              <Grid container spacing={5} className={classes.container}>
                <Grid item xs={12} sm={6} md={5}>
                  <a href={`${STATS_URL}/asset/${good.asset}`} target='_blank' rel='noreferrer'>
                    <div className={classes.imageContainer}>
                      <ProductContent
                        info={assetInfo}
                        className={classes.image}
                      />
                    </div>
                  </a>
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
                  <HistoricalPrices trades={trades} />
                </Grid>
              </Grid>
              <SellerNFTs account={good.accountRS} />
            </>
          )
        }
      </main>
    </>
  )
}

export default memo(NFTDetail)