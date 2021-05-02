
import * as yup from 'yup'
import wordCount from '@iarna/word-count'

const TITLE_VALID = yup.string()
  .required('Please enter a title.');

const STRING_VALID = yup.string()
  .required('Please input field.');

const ACCOUNT_NAME_VALID = yup.string()
  .max(100, 'Name length should be less than 1000.')
  .required('Please enter a name.')

const ACCOUNT_DESCRIPTION_VALID = yup.string()
  .max(1000, 'Description length should be less than 1000.')
  .required('Please enter a description.')

const NFT_DESCRIPTION_VALID = yup.string()
  .max(800, 'Description length should be less than 800.')
  .required('Please enter a description.')

const ACCOUNT_VALID = yup.string()
  .length(24, 'Account length should be 24.')
  .required('Please enter a description.')

const PASSPHRASE_VALID = yup.string()
  .required('Please enter your passphrase.')
  .test('passphrase',
    'Passphrase should be 12 words.',
    value => wordCount(value) === 12);

const PRICE_VALID = yup.number()
  .typeError('Please enter valid number')
  .test('price',
    'Price should be more than 0.',
    value => value > 0)
  .test('price',
    'Incorrect price, maximal 8 decimals allowed.',
    value => ((value).toString().split('.')[1] || []).length <= 8)
  .required('Please input field.');

export {
  TITLE_VALID,
  STRING_VALID,
  ACCOUNT_NAME_VALID,
  ACCOUNT_VALID,
  PASSPHRASE_VALID,
  PRICE_VALID,
  ACCOUNT_DESCRIPTION_VALID,
  NFT_DESCRIPTION_VALID
};