
const connectWallet = () => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      process.env.EUROPA_ID,
      { type: "CONNECT_WALLET" },
      (response) => {
        resolve(response)
      }
    )
  })
};

const getPassphrase = () => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      process.env.EUROPA_ID,
      { type: "GET_PASSPHRASE" },
      (response) => {
        resolve(response)
      }
    )
  })
};

export {
  connectWallet,
  getPassphrase,
};