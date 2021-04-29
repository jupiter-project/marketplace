
import { memo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import ImageWall from 'parts/ImageWall'
import { useCommonStyles } from 'styles/use-styles'
import VerticalTabs from './Shared/VerticalTabs'
import MyCreatedAssets from './MyAssets'
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
    display: 'flex',
    height: '100%',
    width: '100%',
    maxWidth: 720,
    padding: theme.spacing(0, 2),
    marginBottom: theme.spacing(10)
  },
}));

const TABS = [
  'MY NFTS',
  'MY SELL ORDERS',
  'MY BUY ORDERS',
]

const MyNFTs = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <main className={classes.root}>
      <ImageWall header='My NFTs' />
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