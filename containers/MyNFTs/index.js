
import { memo, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import * as jupiterAPI from 'services/api-jupiter'
import MagicIdenticon from 'components/MagicIdenticon'
import LinkButton from 'components/UI/Buttons/LinkButton'
import ImageWall from 'parts/ImageWall'
import { useCommonStyles } from 'styles/use-styles'
import useLoading from 'utils/hooks/useLoading'
import { isEmpty } from 'utils/helpers/utility'
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
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: theme.custom.layout.maxDesktopWidth,
    margin: theme.spacing(7, 0, 13),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2.5, 0)
    }
  },
  info: {
    display: 'flex',
    alignItems: 'center',
  },
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  name: {
    fontWeight: 'bold',
    marginLeft: theme.spacing(1)
  },
  price: {
    padding: theme.spacing(1)
  }
}));

const MyNFTs = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const { changeLoadingStatus } = useLoading();

  const { accountRS, currentUser } = useSelector(state => state.auth);

  const [pendingPurchases, setPendingPurchases] = useState([])

  useEffect(() => {
    const getDGSPendingPurchases = async () => {
      const response = await jupiterAPI.getDGSPendingPurchases(currentUser.account);
      if (response?.errorCode) {
        showErrorToast(MESSAGES.GET_NFT_ERROR)
        return;
      }

      setPendingPurchases(response.purchases)
    }

    if (!isEmpty(currentUser)) {
      getDGSPendingPurchases();
    }
  }, [currentUser])

  const approveDeliverHandler = (item) => () => {
    changeLoadingStatus(false)
    console.log(item)
  }

  return (
    <main className={classes.root}>
      <ImageWall
        header='My NFTs'
        description={accountRS}
      />
      <div className={clsx(commonClasses.containerWidth, classes.container)}>
        {
          pendingPurchases.map((item) => (
            <div key={item.goods} className={classes.itemContainer}>
              <div className={classes.info}>
                <MagicIdenticon value={item.buyerRS} />
                <Typography variant='h5' color='textPrimary' className={classes.name}>
                  {item.name}
                </Typography>
                <Typography variant='body2' color='primary' className={classes.name}>
                  {`${item.priceNQT / NQT_WEIGHT} JUP`}
                </Typography>
              </div>
              <LinkButton onClick={approveDeliverHandler(item)}>
                Approve
              </LinkButton>
            </div>
          ))
        }
      </div>
    </main>
  )
}

export default memo(MyNFTs)