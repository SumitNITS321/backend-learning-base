import { supabase } from './supabaseClient.js'

async function getPublicUrl() {
  const { data } = supabase.storage.from('MENjs3drive').getPublicUrl('test.txt')
  console.log('Public URL:', data.publicUrl)
}

getPublicUrl()
