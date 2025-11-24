const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// // Replace with your project URL and key from Supabase → Settings → API
// const supabaseUrl = 'https://ddevxjngilfkyolybzyv.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkZXZ4am5naWxma3lvbHlienl2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTk0MTUzNCwiZXhwIjoyMDcxNTE3NTM0fQ.mrkPhUsh8fE9joo7J5MfPTCDesOARfP83HvU9ThWqJw'

// export const supabase = createClient(supabaseUrl, supabaseKey)

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

module.exports = { supabase };

