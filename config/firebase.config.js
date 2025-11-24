const Firebase = require('firebase-admin');
const serviceAccount = require('../menjs3drive-firebase-adminsdk-fbsvc-403278cd09.json');
const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: "menjs3drive.appspot.com",
});
module.exports = Firebase;