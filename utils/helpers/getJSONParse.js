const getJSONParse = data => {
  let jsonData = {}
  try {
    jsonData = JSON.parse(data)
  } catch {
    jsonData = {}
  }
  return jsonData
}

export default getJSONParse;

