
import { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import CollectionsIcon from '@material-ui/icons/Collections'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import StyleIcon from '@material-ui/icons/Style'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import clsx from 'clsx'

import ImageWall from 'parts/ImageWall'
import { useCommonStyles } from 'styles/use-styles'
import VerticalTabs from './Shared/VerticalTabs'
import PendingPurchaseNFT from './PendingPurchaseNFT'
import CompletedSalesNFT from './CompletedSalesNFT'
import PurchasedNFT from './PurchasedNFT'
import NFTGoods from './NFTGoods'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  container: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    width: '100%',
    maxWidth: theme.custom.layout.maxDesktopWidth,
    margin: theme.spacing(7, 0, 13),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2.5, 0)
    }
  },
}));

const TABS = [
  {
    icon: CollectionsIcon,
    label: 'My created NFTs',
  },
  {
    icon: StyleIcon,
    label: 'Sold NFTs',
  },
  {
    icon: BusinessCenterIcon,
    label: 'Purchased NFTs',
  },
  {
    icon: ShoppingCartIcon,
    label: 'Pending purchases',
  }
]

const MyNFTs = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  const { accountRS } = useSelector(state => state.auth);
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <main className={classes.root}>
      <ImageWall
        header='My NFTs'
        description={accountRS}
      />
      <div className={clsx(commonClasses.containerWidth, classes.container)}>
        <VerticalTabs
          tabs={TABS}
          value={selectedTab}
          setValue={setSelectedTab}
        />
        <NFTGoods
          value={selectedTab}
          index={0}
        />
        <CompletedSalesNFT
          value={selectedTab}
          index={1}
        />
        <PurchasedNFT
          value={selectedTab}
          index={2}
        />
        <PendingPurchaseNFT
          value={selectedTab}
          index={3}
        />
      </div>
    </main>
  )
}

export default memo(MyNFTs)