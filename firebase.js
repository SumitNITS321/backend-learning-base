const admin = require('firebase-admin');
const serviceAccount = require('./menjs3drive-firebase-adminsdk-fbsvc-403278cd09.json'); // Download from Firebase Console → Project Settings → Service Accounts

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
