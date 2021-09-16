
import Marketplace from 'containers/Marketplace'
import Layout from 'Layout'
import HeaderMeta from 'parts/HeaderMeta'

export default function HomePage() {
  return (
    <Layout>
      <HeaderMeta />
      <Marketplace />
    </Layout>
  )
}