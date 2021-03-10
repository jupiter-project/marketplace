/*
* By using this function, we can generate a list of 12 random words from words array.
* This list of 12 random words will be used generate an jupiter account
* By great.dolphin.ls
*/

import WORDS from 'utils/constants/words';

const PASSPHRASE_LENGTH = 12;
const generatePassphrase = () => {
  const phraseArray = [];

  for (let i = 0; i < PASSPHRASE_LENGTH; i++) {
    phraseArray.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }

  const passphrase = phraseArray.join(' ');
  return passphrase;
}

export default generatePassphrase;