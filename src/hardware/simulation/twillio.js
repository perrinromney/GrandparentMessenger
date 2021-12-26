// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;



const client = require('twilio')(accountSid, authToken);

client.messages
      .create({from: '+15017122661', body: 'Hi there', to: '+15558675310'})
      .then(message => console.log(message.sid));


// CODE FOR SENDING A TEXT MESSAGE WITH TWILLIO

const sendText = async (phoneNumber, message) => {
    const result = await fetch('https://api.twilio.com/2010-04-01/Accounts/{{ACCOUNT_SID}}/Messages')
}

