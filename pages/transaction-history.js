
import TransactionHistory from 'containers/TransactionHistory'
import Layout from 'Layout'
import HeaderMeta from 'parts/HeaderMeta'

export default function TransactionHistoryPage() {
  return (
    <Layout>
      <HeaderMeta />
      <TransactionHistory />
    </Layout>
  )
}