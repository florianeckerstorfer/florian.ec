const remark = require('remark');
const html = require('remark-html');
const prism = require('./remark-prism');

module.exports = () => {
  const processor = remark()
    .use(html)
    .use(prism);
  return {
    set: () => {},
    render: str =>
      new Promise(resolve => {
        processor.process(str, (err, file) => {
          if (err) {
            console.log(err);
            return;
          }
          resolve(String(file));
        });
      }),
  };
};
