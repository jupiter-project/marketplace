
const signTransaction = (unsignedTransactionBytes, passphrase) => {
  const sigPos = 192;
  const sigLen = 128;
  const signature = window.NRS.signBytes(unsignedTransactionBytes, window.converters.stringToHexString(passphrase));
  const transactionBytes = unsignedTransactionBytes.substr(0, sigPos) + signature + unsignedTransactionBytes.substr(sigPos + sigLen);

  return transactionBytes
}

export default signTransaction