import WORDS from "utils/constants/words";

const generatePassphrase = () => {
  const seedArray = [];
  for (let x = 0; x < 12; x += 1) {
    seedArray.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }

  const passphrase = seedArray.join(" ");
  return passphrase;
};

export default generatePassphrase;
