
const getTime = (date) =>
  new Date(date).toTimeString().split(' ')[0]

export {
  getTime
}