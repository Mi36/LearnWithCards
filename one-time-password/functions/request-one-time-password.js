const admin = require('firebase-admin');
const twilio = require('./twilio');
module.exports = async (req, res) => {
  if (!req.body.phone) {
    return res.status(422).send({error: 'You must provide a phone number'});
  }
  const phone = String(req.body.phone).replace(/[^\d+]/g, '');
  //this is an async request

  try {
    await admin.auth().getUser(phone);

    const code = Math.floor(Math.random() * 8999 + 1000);

    await twilio.messages.create({
      body: code,
      to: phone,
      from: '+12724442005',
    });

    await admin
      .database()
      .ref('users/' + phone)
      .update({code, codeValid: true});
    res.send({success: true});
  } catch (error) {
    return res.status(422).send({error: error.message});
  }
};
