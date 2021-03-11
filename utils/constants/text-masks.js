
const TEXT_MASKS = Object.freeze({
  ACCOUNT: ['J', 'U', 'P', '-', /\b[A-Z, 0-9]/, /\b[A-Z, 0-9]/, /\b[A-Z, 0-9]/, /\b[A-Z, 0-9]/, '-', /\b[A-Z, 0-9]/, /\b[A-Z, 0-9]/, /\b[A-Z, 0-9]/, /\b[A-Z, 0-9]/, '-', /\b[A-Z, 0-9]/, /\b[A-Z, 0-9]/, /\b[A-Z, 0-9]/, /\b[A-Z, 0-9]/, '-', /\b[A-Z, 0-9]/, /\b[A-Z, 0-9]/, /\b[A-Z, 0-9]/, /\b[A-Z, 0-9]/, /\b[A-Z, 0-9]/],
})

export default TEXT_MASKS;