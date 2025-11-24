const { supabase } = require('./supabaseClient.js');
const express = require('express');
const app = express();

const multer = require('multer');
const upload = multer()
const dotenv = require('dotenv')
dotenv.config()

const userRouter = require('./routes/user.routes')
const db = require('./config/db')
db()
const cookiesParser = require('cookie-parser')
app.use(cookiesParser())
app.set('view engine','ejs')
const indexRouter = require('./routes/index.routes')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/',indexRouter)
app.use('/user',userRouter)

const admin = require('./firebase');
const uploadFileToSupabase = require('./upload');
const uploadRoutes = require('./routes/upload')
app.use('/api', uploadRoutes);

const PORT = process.env.PORT || 3000;

// app.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     const file = req.file;
//     if (!file) return res.status(400).json({ error: 'No file uploaded' });

//     const { data, error } = await supabase.storage
//       .from('Menjs3drive')
//       .upload(file.originalname, file.buffer, {
//         contentType: file.mimetype,
//         upsert: false, // prevents overwriting files with same name
//       });

//     if (error) return res.status(500).json({ error: error.message });

//     res.json({ message: 'File uploaded successfully', data });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Middleware to verify Firebase ID Token
async function verifyFirebaseToken(req, res, next) {
    try {
        const token = req.headers.authorization?.split('Bearer ')[1];
        if (!token) return res.status(401).json({ error: 'Missing Token' });

        const decoded = await admin.auth().verifyIdToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid Token' });
    }
}

// Upload endpoint
app.post('/upload', verifyFirebaseToken, upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ error: 'No file uploaded' });

        const filename = `uploads/${Date.now()}_${file.originalname}`;
        const result = await uploadFileToSupabase(filename, file.buffer);

        res.json({ message: 'File uploaded successfully', result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//mongodb://0.0.0.0/men-drive