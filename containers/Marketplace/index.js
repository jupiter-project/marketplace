
import { memo, useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import * as jupiterAPI from 'services/api-jupiter'
import NFTCarousel from 'parts/NFTCarousel'
import NFTList from './NFTList'
import SearchInput from './SearchInput'
import TagsFilter from './TagsFilter'

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
  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState('');

  useEffect(() => {
    getDGSGoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, selectedTags]);

  const getDGSGoods = useCallback(async () => {
    try {
      if (!isLast) {
        const params = {
          first,
          last: first + PAGE_COUNT - 1,
          query,
          tag: selectedTags
        }

        const { goods = [] } = await jupiterAPI.searchDGSGoods(params);
        if (first === 0) {
          setGoods(goods);
        } else {
          setGoods((prev) => [...prev, ...goods]);
        }

        setFirst((prev) => prev + goods.length);
        setIsLast(goods.length < PAGE_COUNT);
      }
    } catch (error) {
      console.log(error)
    }
  }, [isLast, first, query, selectedTags, setGoods, setFirst, setIsLast])

  const searchHandler = useCallback(async (value) => {
    if (query !== value) {
      setGoods([]);
      setFirst(0)
      setIsLast(false)
      setQuery(value);
    }
  }, [query, setQuery, setGoods, setFirst, setIsLast])

  const tagsHandler = useCallback(async (tags) => {
    let newSelectedTags = ''
    for (const item of tags) {
      newSelectedTags += `${item.tag} `
    }

    if (newSelectedTags !== selectedTags) {
      setGoods([]);
      setFirst(0)
      setIsLast(false)
      setSelectedTags(newSelectedTags);
    }
  }, [selectedTags, setSelectedTags, setGoods, setFirst, setIsLast])

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.filterContainer}>
          <NFTCarousel />
          <SearchInput onSearch={searchHandler} />
          <TagsFilter onTags={tagsHandler} />
        </div>
        <NFTList
          goods={goods}
          isLast={isLast}
          loadMore={getDGSGoods}
        />
      </div>
    </div>
  )
}

export default memo(Marketplace);