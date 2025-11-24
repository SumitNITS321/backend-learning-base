const { supabase } = require('./supabaseClient.js');
const multer = require('multer');
const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const app = express();
const upload = multer()
const userRouter = require('./routes/user.routes')
const db = require('./config/db')
db()
const cookiesParser = require('cookie-parser')
app.use(cookiesParser())
app.set('view engine','ejs')
const indexRouter = require('./routes/index.routes')

// app.get('/', (req, res) => {
//     res.render('index')
// });//used when no routes were there
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/',indexRouter)
app.use('/user',userRouter)

// app.post('/upload', upload.single('file'), async (req, res) => {
//   const file = req.file
//   const { data, error } = await supabase.storage
//     .from('Menjs3drive')
//     .upload(file.originalname, file.buffer)

//   if (error) return res.status(500).json({ error })
//   res.json({ data })
// })
// Supabase File Upload Endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const { data, error } = await supabase.storage
      .from('Menjs3drive')
      .upload(file.originalname, file.buffer, {
        contentType: file.mimetype,
        upsert: false, // prevents overwriting files with same name
      });

    if (error) return res.status(500).json({ error: error.message });

    res.json({ message: 'File uploaded successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})