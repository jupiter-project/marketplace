
const PROXY_URL = process.env.NODE_ENV === 'production'
  ? 'https://leda.gojupiter.tech/'
  : 'http://localhost:8000'

const JUPITER_URL = 'https://jpr8.gojupiter.tech'
const JUPITER_FEE_CALCULATE_URL = '&feeNQT=0&broadcast=false&calculateFee=true';

export {
  PROXY_URL,
  JUPITER_URL,
  JUPITER_FEE_CALCULATE_URL
}