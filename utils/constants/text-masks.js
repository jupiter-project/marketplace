
const TEXT_MASKS = Object.freeze({
  ACCOUNT: [/\b[a-zA-Z]/, /\b[a-zA-Z]/, /\b[a-zA-Z]/, '-', /\b[a-zA-Z0-9]/, /\b[a-zA-Z0-9]/, /\b[a-zA-Z0-9]/, /\b[a-zA-Z0-9]/, '-', /\b[a-zA-Z0-9]/, /\b[a-zA-Z0-9]/, /\b[a-zA-Z0-9]/, /\b[a-zA-Z0-9]/, '-', /\b[a-zA-Z0-9]/, /\b[a-zA-Z0-9]/, /\b[a-zA-Z0-9]/, /\b[a-zA-Z0-9]/, '-', /\b[a-zA-Z0-9]/, /\b[a-zA-Z0-9]/, /\b[a-zA-Z0-9]/, /\b[a-zA-Z0-9]/, /\b[a-zA-Z0-9]/],
})

export default TEXT_MASKS;