
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
import theme from 'styles/theme';
import { NQT_WEIGHT } from 'utils/constants/common'

const TrendingChart = () => {
  const [purchases, setPurchases] = useState({})

  useEffect(() => {
    const getAllDGSPurchases = async () => {
      const params = {
        first: 0,
        last: 7
      }
      const { purchases = [] } = await jupiterAPI.getAllDGSPurchases(params);
      let chartData = [];
      for (const item of purchases) {
        chartData = [
          ...chartData,
          {
            name: item.name,
            price: item.priceNQT / NQT_WEIGHT
          }
        ]
      }
      setPurchases(chartData);
    }
    getAllDGSPurchases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart
        width={500}
        height={300}
        data={purchases}
        margin={{
          top: 5,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name'>
          <Label value='Latest Transactions' offset={0} position='bottom' style={{ fontSize: 20, fontWeight: 'bold' }} />
        </XAxis>
        <YAxis />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='price'
          stroke={theme.palette.primary.main}
          fill={theme.palette.primary.main}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default memo(TrendingChart)