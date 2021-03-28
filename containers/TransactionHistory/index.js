
import { memo, useEffect, useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import * as jupiterAPI from 'services/api-jupiter'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import ImageWall from 'parts/ImageWall'
import TrendingCard from 'parts/TrendingCard'
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
    alignItems: 'center',
    height: '100%',
    width: '100%',
    maxWidth: theme.custom.layout.maxDesktopWidth,
    margin: theme.spacing(7, 0, 13),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2.5, 0)
    }
  },
  loadButton: {
    margin: theme.spacing(2)
  }
}));

const PAGE_COUNT = 3;

const TransactionHistory = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  const [purchases, setPurchases] = useState([])
  const [first, setFirst] = useState(0)
  const [isLast, setIsLast] = useState(false)

  useEffect(() => {
    getAllDGSPurchases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAllDGSPurchases = useCallback(async () => {
    if (!isLast) {
      const params = {
        first,
        last: first + PAGE_COUNT - 1,
      }

      const response = await jupiterAPI.getAllDGSPurchases(params);
      const { purchases = [] } = response;
      setPurchases((prev) => [...prev, ...purchases]);
      setFirst((prev) => prev + purchases.length);
      setIsLast(purchases.length < PAGE_COUNT);
    }
  }, [isLast, first, setPurchases, setFirst, setIsLast]);

  return (
    <main className={classes.root}>
      <ImageWall header='Transactions' />
      <div className={clsx(commonClasses.containerWidth, classes.container)}>
        <TrendingCard />
        {
          purchases.map((item, index) => (
            <TransactionItem
              key={index}
              item={item}
            />
          ))
        }
        {
          !isLast &&
          <ContainedButton
            onClick={getAllDGSPurchases}
            className={classes.loadButton}
          >
            Load More
          </ContainedButton>
        }
      </div>
    </main>
  )
}

export default memo(TransactionHistory)