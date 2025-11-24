import { supabase } from './supabaseClient.js'

async function listFiles() {
  const { data, error } = await supabase.storage.from('uploads').list()

  if (error) console.error('Error:', error)
  else console.log('Files:', data)
}

listFiles()
