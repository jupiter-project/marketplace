
import { memo, useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import * as jupiterAPI from 'services/api-jupiter'
import NFTList from './NFTList'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(5, 0)
  },
  container: {
    width: '100%',
    maxWidth: theme.custom.layout.maxMarketPlaceWidth,
  },
  filterContainer: {
    padding: theme.spacing(2, 3.5)
  },
}));

const PAGE_COUNT = 8;

const Marketplace = () => {
  const classes = useStyles();

  const [goods, setGoods] = useState([]);
  const [first, setFirst] = useState(0);
  const [isLast, setIsLast] = useState(false)

  useEffect(() => {
    getAllOpenAskOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllOpenAskOrders = useCallback(async () => {
    try {
      if (!isLast) {
        const params = {
          first,
          last: first + PAGE_COUNT - 1,
        }

        const { openOrders = [] } = await jupiterAPI.getAllOpenAskOrders(params);
        if (first === 0) {
          setGoods(openOrders);
        } else {
          setGoods((prev) => [...prev, ...openOrders]);
        }

        setFirst((prev) => prev + openOrders.length);
        setIsLast(openOrders.length < PAGE_COUNT);
      }
    } catch (error) {
      console.log(error)
    }
  }, [isLast, first, setGoods, setFirst, setIsLast])

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <NFTList
          goods={goods}
          isLast={isLast}
          loadMore={getAllOpenAskOrders}
        />
      </div>
    </div>
  )
}

export default memo(Marketplace);