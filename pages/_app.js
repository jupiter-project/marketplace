
import Head from 'next/head'
import { Provider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'

import store from 'store'
import { DarkModeProvider } from 'contexts/ui-context'
import InitProvider from 'utils/hocs/InitProvider'
import PopUpProvider from 'utils/hocs/PopUpProvider'
import ThemeProvider from 'utils/hocs/ThemeProvider'
import MagicWeb3Provider from 'utils/hocs/MagicWeb3Provider'
import * as COMMON_CONSTANTS from 'utils/constants/common'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{COMMON_CONSTANTS.TITLE}</title>
        <meta charSet='utf-8' />
        <meta name='keywords' content='Keywords' />
        <meta name='description' content='Description' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='theme-color' content='#FFFFFF' />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no' />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content='website' />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='628' />

        {/* Twitter */}
        <meta property='twitter:card' content='summary_large_image' />
        <meta name='msapplication-config' content='/browserconfig.xml' />
        <meta name='msapplication-TileColor' content='#FFFFFF' />
        <meta name='msapplication-TileImage' content='/mstile-144x144.png' />
      </Head>
      <Provider store={store}>
        <MagicWeb3Provider>
          <DarkModeProvider>
            <InitProvider />
            <ThemeProvider>
              <PopUpProvider />
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </DarkModeProvider>
        </MagicWeb3Provider>
      </Provider>
    </>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return { pageProps };
};

export default MyApp
