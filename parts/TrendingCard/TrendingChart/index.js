
import { memo, useEffect, useState } from 'react'
import {
  AreaChart,
  Area,
  Label,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import * as jupiterAPI from 'services/api-jupiter'
import { NQT_WEIGHT } from 'utils/constants/common'

const TrendingChart = () => {
  const [trades, setTrades] = useState({})

  useEffect(() => {
    const searchAllTrades = async () => {
      const params = {
        first: 0,
        last: 7
      }
      const { trades = [] } = await jupiterAPI.searchAllTrades(params);
      let chartData = [];
      for (const item of trades) {
        chartData = [
          {
            name: item.description,
            price: item.priceNQT / NQT_WEIGHT,
            total: item.priceNQT * item.quantityQNT / NQT_WEIGHT,
          },
          ...chartData,
        ]
      }
      setTrades(chartData);
    }
    searchAllTrades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart
        width={500}
        height={300}
        data={trades}
        margin={{
          top: 5,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name'>
          <Label
            value='Latest Transactions'
            offset={0}
            position='bottom'
            style={{ fontSize: 20, fontWeight: 'bold' }}
          />
        </XAxis>
        <YAxis />
        <Tooltip />
        <Area type='monotone' dataKey='total' stackOffset='expand' strokeWidth={3} stroke='#41d98d' fill='#41d98d' />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default memo(TrendingChart)