
import Layout from 'Layout'
import SignUp from 'containers/Auth/SignUp'
import HeaderMeta from 'parts/HeaderMeta'

export default function SignUpPage() {
  return (
    <Layout isFooter={false}>
      <HeaderMeta />
      <SignUp />
    </Layout>
  )
}