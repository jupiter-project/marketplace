
import Head from 'next/head'

import * as COMMON_CONSTANTS from 'utils/constants/common'
import { BANNER_IMAGE_PATH } from 'utils/constants/image-paths'

const HeaderMeta = () => {
  return (
    <Head>
      {/* Open Graph / Facebook */}
      <meta property='og:url' content={COMMON_CONSTANTS.SITE_URL} />
      <meta property='og:title' content={COMMON_CONSTANTS.TITLE} />
      <meta property='og:description' content={COMMON_CONSTANTS.DESCRIPTION} />
      <meta property='og:image' content={BANNER_IMAGE_PATH} />

      {/* Twitter */}
      <meta property='twitter:url' content={COMMON_CONSTANTS.SITE_URL} />
      <meta property='twitter:title' content={COMMON_CONSTANTS.TITLE} />
      <meta property='twitter:description' content={COMMON_CONSTANTS.DESCRIPTION} />
      <meta property='twitter:image' content={BANNER_IMAGE_PATH} />
    </Head>
  )
}

export default HeaderMeta
