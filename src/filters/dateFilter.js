const dayjs = require('dayjs');

function dateFilter(date, format) {
  return dayjs(date).format(format);
}

module.exports = dateFilter;
