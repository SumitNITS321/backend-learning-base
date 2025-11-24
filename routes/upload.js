const express = require('express');
const multer = require('multer');
const supabase = require('../supabase');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send('No file uploaded');

        const { data, error } = await supabase.storage
            .from('MENjs3drive') // Bucket name in Supabase
            .upload(`uploads/${Date.now()}-${req.file.originalname}`, req.file.buffer, {
                contentType: req.file.mimetype,
            });

        if (error) throw error;

        res.json({ success: true, path: data.path });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

module.exports = router;
