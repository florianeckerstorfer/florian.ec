const dayjs = require('dayjs');

function currentYearShortcode() {
  return `<span>${dayjs().format('YYYY')}</span>`;
}

module.exports = currentYearShortcode;
