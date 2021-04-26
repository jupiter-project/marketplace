import { memo, useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import * as jupiterAPI from 'services/api-jupiter'
import NoData from 'parts/NoData'
import ImageWall from 'parts/ImageWall'
import NFTInformation from './NFTInformation'
import NFTImage from './NFTImage'
import AssetBids from './AssetBids'
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
    padding: theme.spacing(10, 3),
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    paddingTop: `${theme.spacing(8)}px !important`,
  },
  rightContainer: {
    display: 'flex',
    alignItems: 'center'
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
      <div className={classes.container}>
        {isEmpty(good)
          ? (
            <NoData />
          ) : (
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6} md={8} className={classes.imageContainer}>
                <NFTImage good={assetInfo} />
              </Grid>
              <Grid item xs={12} sm={6} md={4} className={classes.rightContainer}>
                <NFTInformation
                  isMine={accountRS === good.accountRS}
                  good={good}
                  account={account}
                  assetInfo={assetInfo}
                />
              </Grid>
              <Grid item xs={12}>
                <AssetBids
                  isMine={accountRS === good.accountRS}
                  good={good}
                />
              </Grid>
            </Grid>
          )
        }
      </div>
    </main>
  )
}

export default memo(NFTDetail)