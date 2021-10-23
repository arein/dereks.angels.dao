const pass = require('./pass');
const balance = require('./balance');
const auth = require('./auth');

const contract = '0x7f6fECB0D79fC1B325ae064788bf3c0e6dE8e35B';

module.exports.handler = async (event) => {
  console.log('Event: ', event);

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
  
  const wallet = event.queryStringParameters['wallet'];
  const signature = event.queryStringParameters['nonce'];
  return balance.getBalance(contract, wallet).then((balance) => {
    console.log("balance is", balance);
    return auth.isOwner(signature, wallet, balance).then((isOwner) => {
      console.log('is owner', isOwner);
      if (!isOwner) {
        console.log("You're not an owner", isOwner);
        return {
          statusCode: 403,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Sorry you don't own ${wallet}`,
          }),
        };
      }

      return pass.getPass().then((buffer) => {
        console.log("Created Pass");
        try {
          return {
            statusCode: 200,
            headers: {
              'Content-Disposition': 'attachment;filename=angelsgate.pkpass',
              'Content-Type': 'application/vnd.apple.pkpass',
            },
            body: buffer.toString('base64'),
            isBase64Encoded: true
          }
        } catch (err) {
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
    });
  
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
