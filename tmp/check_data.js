const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://esfwrnaqimzejcxsuxna.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzZndybmFxaW16ZWpjeHN1eG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NTE0NDksImV4cCI6MjA4ODQyNzQ0OX0.VSnB3E3IGu57duQL6A0EVaGYg1gMQrBHNYhKRP8hia0'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkData() {
    const { data, error } = await supabase
        .from('resumes')
        .select('id, name, user_id, content, generated_content')
        .order('created_at', { ascending: false })
        .limit(5)

    if (error) {
        console.error('Error fetching resumes:', error)
    } else {
        console.log('Recent Resumes:', JSON.stringify(data, null, 2))
    }
}

checkData()
