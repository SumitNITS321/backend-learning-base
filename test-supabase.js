require('dotenv').config();
const fetch = require('node-fetch');

(async () => {
    try {
        const res = await fetch(process.env.SUPABASE_URL, {
            headers: { apikey: process.env.SUPABASE_KEY }
        });
        console.log('Status:', res.status);
        console.log('Body:', await res.text());
    } catch (err) {
        console.error('Fetch failed:', err.message);
    }
})();
