// Lambda function code

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

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: responseMessage,
    }),
  }
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
