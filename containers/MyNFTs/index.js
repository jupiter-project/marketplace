
import { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import CollectionsIcon from '@material-ui/icons/Collections'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import StyleIcon from '@material-ui/icons/Style'
// import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import clsx from 'clsx'

import ImageWall from 'parts/ImageWall'
import { useCommonStyles } from 'styles/use-styles'
import VerticalTabs from './Shared/VerticalTabs'
import MyCreatedAssets from './MyCreatedAssets'
import MyAskOrders from './MyAskOrders'
import MyBidOrders from './MyBidOrders'

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
    label: 'Created Assets',
  },
  {
    icon: ShoppingCartIcon,
    label: 'Ask Orders',
  },
  {
    icon: StyleIcon,
    label: 'Bid Orders',
  },
  // {
  //   icon: BusinessCenterIcon,
  //   label: 'Purchased NFTs',
  // },
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
        <MyCreatedAssets
          value={selectedTab}
          index={0}
        />
        <MyAskOrders
          value={selectedTab}
          index={1}
        />
        <MyBidOrders
          value={selectedTab}
          index={2}
        />
      </div>
    </main>
  )
}

export default memo(MyNFTs)