
import { memo, useEffect, useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'

import * as jupiterAPI from 'services/api-jupiter'
import ImageWall from 'parts/ImageWall'
import TransactionItem from './TransactionItem'
import { useCommonStyles } from 'styles/use-styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    maxWidth: 560,
    marginBottom: theme.spacing(10),
  },
  moreIcon: {
    fontSize: 50
  }
}));

const PAGE_COUNT = 8;

const TransactionHistory = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  const [trades, setTrades] = useState([])
  const [first, setFirst] = useState(0)
  const [isLast, setIsLast] = useState(false)

  useEffect(() => {
    searchAllTrades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const searchAllTrades = useCallback(async () => {
    if (!isLast) {
      const params = {
        first,
        last: first + PAGE_COUNT - 1,
      }

      const response = await jupiterAPI.searchAllTrades(params);
      const { trades = [] } = response;
      setTrades((prev) => [...prev, ...trades]);
      setFirst((prev) => prev + trades.length);
      setIsLast(trades.length < PAGE_COUNT);
    }
  }, [isLast, first, setTrades, setFirst, setIsLast]);

  return (
    <main className={classes.root}>
      <ImageWall header='Transactions' />
      <div className={clsx(commonClasses.containerWidth, classes.container)}>
        {
          trades.map((item, index) => (
            <TransactionItem
              key={index}
              item={item}
            />
          ))
        }
        {
          !isLast &&
          <IconButton color='primary' onClick={searchAllTrades} >
            <ExpandMoreIcon className={classes.moreIcon} />
          </IconButton>
        }
      </div>
    </main>
  )
}

export default memo(TransactionHistory)