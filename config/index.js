const IS_MAINNET = process.env.NETWORK === 'mainnet'

const PROXY_URL = process.env.NODE_ENV !== 'production'
  ? 'https://leda.gojupiter.tech/'
  : 'http://localhost:8000'

const JUPITER_URL = 'https://nodes.jup.io'

const STATS_URL = 'https://stats.jup.io'

const ERC_CHAIN_ID = IS_MAINNET ? 1 : 4;

export {
  PROXY_URL,
  JUPITER_URL,
  STATS_URL,
  ERC_CHAIN_ID
}