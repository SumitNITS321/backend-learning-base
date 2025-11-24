import { supabase } from './supabaseClient.js'
import fs from 'fs'

async function downloadFile() {
  const { data, error } = await supabase.storage.from('MENjs3drive').download('test.txt')

  if (error) return console.error('Download error:', error)

  const content = await data.text()
  console.log('Downloaded Content:', content)

  fs.writeFileSync('./downloaded_test.txt', content) // Save locally
}

downloadFile()
