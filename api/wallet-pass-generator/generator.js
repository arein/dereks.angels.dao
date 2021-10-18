const pass = require('./pass');

module.exports.handler = async (event) => {
  console.log('Event: ', event);
  let responseMessage = 'Hello, World!';

  if (validateInput(event.queryStringParameters).length > 0) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Required parameters ${validateInput(event.queryStringParameters).join(';')} not provided`,
      }),
    }
  }
  return pass.getPass().then((buffer) => {
    console.log("Created Pass");
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/vnd.apple.pkpass',
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true
    }
  }).catch((err) => {
    console.log("Failed with error", err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: err.message,
      }),
    }
  });
}

const validateInput = (queryStringParameters) => {
  const requiredParams = ['wallet', 'nonce'];
  if (!queryStringParameters) return requiredParams;

  const missingParams = [];

  requiredParams.forEach((param) => {
    if (!queryStringParameters[param]) {
      missingParams.push(param);
    }
  });

  return missingParams;
};
