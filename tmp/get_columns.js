const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://esfwrnaqimzejcxsuxna.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzZndybmFxaW16ZWpjeHN1eG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NTE0NDksImV4cCI6MjA4ODQyNzQ0OX0.VSnB3E3IGu57duQL6A0EVaGYg1gMQrBHNYhKRP8hia0'

const supabase = createClient(supabaseUrl, supabaseKey)

async function getColumns() {
    // try to insert an empty object to get the schema error which lists available columns, or just use rpc if available
    const { error: insertError } = await supabase
        .from('resumes')
        .insert([{ non_existent_column: "test" }])
        .select()

    console.log(insertError)
}

getColumns()
