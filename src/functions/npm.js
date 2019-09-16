const fetch = require('cross-fetch');

exports.handler = async function(event, context, callback) {
  const url = `https://registry.npmjs.org/${event.queryStringParameters.package}`;
  try {
    const response = await fetch(url);
    callback(null, {
      statusCode: 200,
      body: await response.text(),
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    callback(null, { statusCode: 500, body: `Error: ${err.message}` });
  }
};
