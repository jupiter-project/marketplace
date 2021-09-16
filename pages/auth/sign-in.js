
import Layout from 'Layout'
import SignIn from 'containers/Auth/SignIn'
import HeaderMeta from 'parts/HeaderMeta'

export default function SignInPage() {
  return (
    <Layout isFooter={false}>
      <HeaderMeta />
      <SignIn />
    </Layout>
  )
}