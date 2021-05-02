
import { Fragment } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'

import globalStyles from 'styles/global'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () => originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        <Fragment key='styles'>
          {initialProps.styles}
          {sheets.getStyleElement()}
        </Fragment>
      ]
    };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='manifest' href='/site.webmanifest' />
          <link rel='preload' href='/assets/fonts/CRC-LIGHT.woff' as='font' crossOrigin='anonymous' />
          <link rel='preload' href='/assets/fonts/CRC-BOLD.woff' as='font' crossOrigin='anonymous' />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
          <link rel='apple-touch-icon' sizes='120x120' href='/apple-touch-icon.png' />
          <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons&display=swap' />
          <style jsx global>
            {globalStyles}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src='//rum-static.pingdom.net/pa-608b643653910000110002c4.js' async crossOrigin="anonymous" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
