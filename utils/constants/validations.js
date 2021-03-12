
import * as yup from 'yup'
import wordCount from '@iarna/word-count'

const NAME_VALID = yup.string()
  .required('Please enter your name.');

const EMAIL_VALID = yup.string()
  .email('Please enter a valid email address.')
  .required('Please enter your email address.');

const PASSWORD_VALID = yup.string()
  .required('Please enter in Password.')
  .min(6, 'Passwords need to be at least 6 characters.');

const CONFIRM_PASSWORD_VALID = yup.string()
  .required('Please enter in Password.')
  .oneOf(
    [yup.ref('password'), null],
    'Passwords needs to match.'
  );

const STRING_VALID = yup.string()
  .required('Please input field.');

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

const INTEGER_VALID = yup.number()
  .typeError('Please enter valid number')
  .integer('This field should be integer')
  .min(1, 'This field should be more than one');

export {
  NAME_VALID,
  EMAIL_VALID,
  PASSWORD_VALID,
  CONFIRM_PASSWORD_VALID,
  PASSPHRASE_VALID,
  ACCOUNT_VALID,
  STRING_VALID,
  NUMBER_VALID,
  INTEGER_VALID
};