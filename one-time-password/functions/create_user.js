//here not access tp es6
// use common js
const admin = require('firebase-admin');
module.exports = function(req, res) {
  //verify user provided a phone
  if (!req.body.phone) {
    return res.status(422).send({error: 'Bad Input'});
  }

  // format phone number, user may enter phone number as string or num format
  // any way we use as string
  //we must avoid all other charecters from number
  //repalce() only work for string
  const phone = String(req.body.phone).replace(/[^\d]/g, '');

  //create a new user using that account
  //here we use phone number as id of user
  //then it is not possible to create same phone number multiple times
  //uid :unique id
  // below code is asynchronous request. it takes some time
  //we have to handle this
  //below function returns a promise
  admin
    .auth()
    .createUser({uid: phone})
    .then(user => res.send(user))
    .catch(err => res.status(422).send({error: err}));
};
