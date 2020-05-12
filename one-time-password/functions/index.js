const functions = require('firebase-functions');
const admin = require('firebase-admin'); //this is an access to our firebase project, ie our service account
const createUser = require('./create_user');
const requestOneTimePassword = require('./request-one-time-password');
const verifyOneTimePassword = require('./verify-one-time-password');

const serviceAccount = require('./service_account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://one-time-password-7d3f5.firebaseio.com',
});

exports.createUser = functions.https.onRequest(createUser);
exports.requestOneTimePassword = functions.https.onRequest(
  requestOneTimePassword,
);
exports.verifyOneTimePassword = functions.https.onRequest(
  verifyOneTimePassword,
);
//this means any time an https request comes in run the command above, ie createUser
//this is google cloud function we defined
