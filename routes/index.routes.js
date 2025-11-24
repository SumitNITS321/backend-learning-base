const express = require('express')
const auth = require('../middlewares/auth')
const { createClient } = require('@supabase/supabase-js'); 
const router = express.Router()
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabase = require('../supabase')
const upload = require('../config/multer.config')
const filemodel = require('../models/files.models')
// router.get('/',(req,res)=>{
//     res.render('home')
// })
// router.post('/upload',upload.single('file'),(req,res)=>{
//     res.send(req.file)
// })
router.get('/',auth,async(req,res)=>{
    const newfile = await filemodel.find({
        userId:req.user.userid
    })
    console.log(newfile)

    res.render('home',{
    files: newfile
    })

})

// router.post('/upload', upload.single('file'), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }

//         console.log('File received:', req.file); // Verify file

//         const fileName = req.file.originalname; // use actual filename, e.g., week0.txt

//         // Upload to Supabase Storage
//         const { data, error } = await supabase.storage
//             .from('MENjs3drive') // bucket name (must exist in Supabase exactly)
//             .upload(fileName, req.file.buffer, {
//                 contentType: req.file.mimetype,
//                 upsert: false, // allow overwriting files with the same name
//             });

//         console.log('Upload result:', data, 'Error:', error);

//         if (error) {
//             return res.status(500).json({ error: 'Supabase upload failed', details: error });
//         }

//         // Get public URL to access the file
//         const { data: publicUrlData } = supabase.storage
//             .from('MENjs3drive')
//             .getPublicUrl(fileName);

//         res.json({
//             message: 'File uploaded successfully',
//             fileName,
//             publicUrl: publicUrlData.publicUrl,
//         });

//     } catch (err) {
//         console.error('Server error:', err);
//         res.status(500).json({ error: 'Upload failed', details: err.message });
//     }
// });
// router.post('/upload',auth,upload.single('file'),async(req,res)=>{

//     const newfile = await filemodel.create({
//         path:req.file.path,
//         originalname:req.file.originalname,
//         user:req.user.userid
//     })
//     res.json(newfile)
// })
router.post('/upload', auth, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log('File received:', req.file);

        //const fileName = req.file.originalname;
        // Sanitize filename (Supabase does not allow []{}()<> etc.)
        let safeName = req.file.originalname.replace(/[\[\]{}()<>#?&%*"':;]/g, '_');
        safeName = safeName.replace(/\s+/g, '_'); // optional: replace spaces
        const fileName = `${Date.now()}_${safeName}`;

        // Upload to Supabase
        const { data, error } = await supabase.storage
            .from('MENjs3drive')
            .upload(fileName, req.file.buffer, {
                contentType: req.file.mimetype,
                upsert: false
            });

        if (error) {
            console.error('Supabase Error:', error);
            return res.status(500).json({ error: 'Supabase upload failed', details: error });
        }

        // Get Public URL
        const { data: publicUrlData } = supabase.storage
            .from('MENjs3drive')
            .getPublicUrl(fileName);

        // Save file details in MongoDB
        const newFile = await filemodel.create({
            path: req.file.path,
            supabaseurl: publicUrlData.publicUrl,
            originalname: fileName,
            userId: req.user.userid
        });

        res.json({
            message: 'File uploaded to Supabase & saved to MongoDB',
            file: newFile
        });

    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Upload failed', details: err.message });
    }
});

module.exports = router