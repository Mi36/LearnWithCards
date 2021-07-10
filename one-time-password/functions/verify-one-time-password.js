const admin = require('firebase-admin');
module.exports = function(req, res) {
  if (!req.body.phone || !req.body.code) {
    return res.status(422).send({error: 'Phone and code must be provided'});
  }

  const phone = String(req.body.phone).replace(/[^\d+]/g, '');
  const code = parseInt(req.body.code);

  // we need identify current user

  admin
    .auth()
    .getUser(phone)
    .then(() => {
      const ref = admin.database().ref('users/' + phone);
      ref.on('value', snapshot => {
        ref.off(); //after we get one value stop listening it or update it again, only allow one change
        const user = snapshot.val();

        if (user.code !== code || !user.codeValid) {
          return res.status(422).send({error: 'Code not valid'});
        }
        ref.update({codeValid: false});
        //create jwt
        // the below function creates a jwt for using user id
        //it is an async function. it returns promise.
        admin
          .auth()
          .createCustomToken(phone)
          .then(token => res.send({token: token}))
          .catch(err => res.status(422).send({error: err}));
      });
    })
    .catch(err => res.status(422).send({error: err}));
};
