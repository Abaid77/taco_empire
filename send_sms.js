require("dotenv").load();
// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const textOwner = () => {
  client.messages
    .create({
      body: "\nA new order has been received.\n Plese respond on the website!",
      from: "+15103234604",
      to: "+15877006592",
    })
    .then((message) => console.log(message.sid));
};

const textUser = (phone, order_id, duration, name) => {
  client.messages
    .create({
      body: `\nDO NOT REPLY \nThank you ${name} for ordering from Taco Empire!
      \n Your order number is ${order_id}.\n It will be ready in ${duration} minutes.`,
      from: "+15103234604",
      to: phone,
    })
    .then((message) => console.log(message.sid));
};

module.exports = { textOwner, textUser };
