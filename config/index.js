
const PROXY_URL = process.env.NODE_ENV === 'production'
  ? 'http://144.202.77.55:8000'
  : 'http://localhost:8000'

export {
  PROXY_URL,
}