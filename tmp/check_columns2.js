const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://esfwrnaqimzejcxsuxna.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzZndybmFxaW16ZWpjeHN1eG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NTE0NDksImV4cCI6MjA4ODQyNzQ0OX0.VSnB3E3IGu57duQL6A0EVaGYg1gMQrBHNYhKRP8hia0'
const supabase = createClient(supabaseUrl, supabaseKey)

// Fetch a single row to see its structure
async function getCols() {
    const { data, error } = await supabase.from('resumes').select('*').limit(1)
    if (error) {
        console.error("Error", error)
    } else {
        if (data && data.length > 0) {
            console.log(Object.keys(data[0]))
        } else {
            console.log("No data, try inserting to see structure error")
        }
    }
}
getCols()
