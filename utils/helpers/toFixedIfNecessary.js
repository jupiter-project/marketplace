const toFixedIfNecessary = (value) => {
  const decimalPrecision = 18
  let output = parseFloat(value).toFixed(decimalPrecision);
  output = output.replace(/\.?0+$/, "");
  return output;
}

export default toFixedIfNecessary