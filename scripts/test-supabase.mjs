import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qcvkydbqbvrddstetipx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjdmt5ZGJxYnZyZGRzdGV0aXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MTQ3MTYsImV4cCI6MjA4OTQ5MDcxNn0.Ie3AypMX3PwGMVQzOM3PI6v30dZQXwKhxg9zz2gobrw'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('Testing Supabase connection with new credentials...')
  try {
    // 1. Test Auth Connection
    const { data: authData, error: authError } = await supabase.auth.getSession()
    if (authError) {
      console.error('❌ Auth API Error:', authError.message)
    } else {
      console.log('✅ Auth API: Connection Successful')
    }

    // 2. Test Database Connection
    // Attempting to read metadata or common table
    const { data: dbData, error: dbError } = await supabase.from('profiles').select('*').limit(1)
    if (dbError) {
      if (dbError.code === '42P01') {
        console.log('✅ Database API: Connected successfully (Note: "profiles" table does not exist yet)')
      } else {
        console.error('❌ Database API Error:', dbError.message)
      }
    } else {
      console.log('✅ Database API: Connection Successful & "profiles" table found')
    }
  } catch (err) {
    console.error('❌ Unexpected Error:', err)
  }
}

testConnection()
