import { supabase } from './supabase/supabaseClient.js'
import fs from 'fs'

// Example: Uploading a local file named test.txt to the 'uploads' bucket
async function uploadFile() {
  const fileBuffer = fs.readFileSync('./test.txt')
  const { data, error } = await supabase.storage
    .from('MENjs3drive')
    .upload('test.txt', fileBuffer, {
      contentType: 'text/plain'
    })

  if (error) console.error('Upload error:', error)
  else console.log('Uploaded:', data)
}

uploadFile()
