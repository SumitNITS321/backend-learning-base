// const multer = require('multer');
// const firebaseStorage = require('multer-firebase-storage');
// const firebase = require('./firebase.config');
// const serviceAccount = require('../menjs3drive-firebase-adminsdk-fbsvc-403278cd09.json');

// const storage = firebaseStorage({
//     credentials: firebase.credential.cert(serviceAccount),
//     storageBucketName: 'menjs3drive.appspot.com',
// });
// const upload = multer({ storage: storage });
// module.exports = upload;   
const multer = require('multer');
const path = require('path');

// Configure storage to save files in a "files" folder inside your project
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../files'));
    },
    filename: (req, file, cb) => {
        // Unique filename: timestamp-originalname
        cb(null, Date.now() + '-' + file.originalname);
    }
});

//module.exports = multer({ storage: multer.memoryStorage() });
module.exports = multer({ storage });

//Right now, your multer.config.js uses memoryStorage(), which keeps the file in memory (RAM) as a buffer. To save files locally on disk using Multer, you should switch to diskStorage().