const supabase = require('./supabase');

async function uploadFileToSupabase(filename, buffer) {
    const { data, error } = await supabase.storage
        .from('MENjs3drive') // your Supabase bucket name
        .upload(filename, buffer, {
            cacheControl: '3600',
            upsert: false,
        });

    if (error) throw error;
    return data;
}

module.exports = uploadFileToSupabase;
