
import { memo, useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import * as jupiterAPI from 'services/api-jupiter'
import ImageWall from 'parts/ImageWall'
import SearchInput from 'parts/SearchInput'
import NFTList from 'parts/NFTList'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  container: {
    width: '100%',
    maxWidth: theme.custom.layout.maxMarketPlaceWidth,
    padding: theme.spacing(2),
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: theme.spacing(2)
  },
}));

const PAGE_COUNT = 8;

const Marketplace = () => {
  const classes = useStyles();

  const [goods, setGoods] = useState([]);
  const [first, setFirst] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getAllOpenAskOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const getAllOpenAskOrders = useCallback(async () => {
    try {
      if (!isLast) {
        const params = {
          first,
          last: first + PAGE_COUNT - 1,
          query
        }

        const { openOrders = [] } = await jupiterAPI.searchAllOpenAskOrders(params);
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
  }, [query, isLast, first, setGoods, setFirst, setIsLast])

  const searchHandler = useCallback(async (value) => {
    if (query !== value) {
      setGoods([]);
      setFirst(0)
      setIsLast(false)
      setQuery(value);
    }
  }, [query, setQuery, setGoods, setFirst, setIsLast])

  return (
    <div className={classes.root}>
      <ImageWall header='MARKETPLACE' />
      <div className={classes.container}>
        <div className={classes.filterContainer}>
          <SearchInput onSearch={searchHandler} />
        </div>
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