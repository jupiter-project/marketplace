
const GENESIS_TIMESTAMP = Math.round(new Date('2017-10-21 23:19:28') / 1000);

const getTimestamp = (date) => {
  return Math.round(date / 1000) - GENESIS_TIMESTAMP;
}

const getDateFromTimestamp = (timestamp) =>
  new Date((GENESIS_TIMESTAMP + timestamp) * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })

export {
  getTimestamp,
  getDateFromTimestamp
}