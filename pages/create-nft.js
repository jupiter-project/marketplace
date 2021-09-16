
import CreateNFT from 'containers/CreateNFT'
import Layout from 'Layout'
import HeaderMeta from 'parts/HeaderMeta'

export default function HomePage() {
  return (
    <Layout>
      <HeaderMeta />
      <CreateNFT />
    </Layout>
  )
}