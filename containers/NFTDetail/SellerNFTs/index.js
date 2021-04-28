
import { memo, useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import * as jupiterAPI from 'services/api-jupiter'
import NFTList from 'parts/NFTList'
import { isEmpty } from 'utils/helpers/utility'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    maxWidth: theme.custom.layout.maxMarketPlaceWidth,
    padding: theme.spacing(4, 3)
  },
  title: {
    fontSize: 28,
  }
}));

const PAGE_COUNT = 8;

const SellerNFTs = ({
  account
}) => {
  const classes = useStyles();

  const [goods, setGoods] = useState([]);
  const [first, setFirst] = useState(0);
  const [isLast, setIsLast] = useState(false);

  useEffect(() => {
    if (!isEmpty(account)) {
      getAccountCurrentAskOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const getAccountCurrentAskOrders = useCallback(async () => {
    try {
      if (!isLast) {
        const params = {
          first,
          last: first + PAGE_COUNT - 1,
          account
        }

        const { askOrders = [] } = await jupiterAPI.getAccountCurrentAskOrders(params);

        setGoods((prev) => [...prev, ...askOrders]);
        setFirst((prev) => prev + askOrders.length);
        setIsLast(askOrders.length < PAGE_COUNT);
      }
    } catch (error) {
      console.log(error)
    }
  }, [account, isLast, first, setGoods, setFirst, setIsLast])

  return (
    <div className={classes.container}>
      <Typography align='center' color='textSecondary' className={classes.title}>
        MORE NFTS FROM THIS SELLER
      </Typography>
      <NFTList
        goods={goods}
        isLast={isLast}
        loadMore={getAccountCurrentAskOrders}
      />
    </div>
  )
}

export default memo(SellerNFTs);