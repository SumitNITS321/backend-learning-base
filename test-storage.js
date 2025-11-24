require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

(async () => {
    try {
        const { data, error } = await supabase.storage.listBuckets();
        if (error) throw error;
        console.log('Buckets:', data);
    } catch (err) {
        console.error('Error:', err.message);
    }
})();
