
import * as yup from 'yup'
import wordCount from '@iarna/word-count'

const STRING_VALID = yup.string()
  .required('Please input field.');

const DESCRIPTION_VALID = yup.string()
  .max(1000, 'Description length should be less than 1000.')
  .required()

const ACCOUNT_VALID = yup.string()
  .length(24, 'Account length should be 24.')
  .required()

const PASSPHRASE_VALID = yup.string()
  .required('Please input field.')
  .test('passphrase',
    'Passphrase should be 12 words.',
    value => wordCount(value) === 12);

const NUMBER_VALID = yup.number()
  .typeError('Please enter valid number')
  .required('Please input field.');

const PRICE_VALID = yup.number()
  .typeError('Please enter valid number')
  .test('price',
    'Price should be more than 0.',
    value => value > 0)
  .test('price',
    'Incorrect price, maximal 8 decimals allowed.',
    value => ((value).toString().split('.')[1] || []).length <= 8)
  .required('Please input field.');

const INTEGER_VALID = yup.number()
  .typeError('Please enter valid number')
  .integer('This field should be integer')
  .min(1, 'This field should be more than one');

export {
  STRING_VALID,
  ACCOUNT_VALID,
  PASSPHRASE_VALID,
  NUMBER_VALID,
  PRICE_VALID,
  INTEGER_VALID,
  DESCRIPTION_VALID
};