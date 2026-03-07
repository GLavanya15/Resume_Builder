const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://esfwrnaqimzejcxsuxna.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzZndybmFxaW16ZWpjeHN1eG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NTE0NDksImV4cCI6MjA4ODQyNzQ0OX0.VSnB3E3IGu57duQL6A0EVaGYg1gMQrBHNYhKRP8hia0'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkColumns() {
    const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .limit(1)

    if (error) {
        console.error('Error fetching resumes:', error)
    } else if (data && data.length > 0) {
        console.log('Columns in resumes:', Object.keys(data[0]))
    } else {
        console.log('No data in resumes table or table is empty.')
        const { error: insertError } = await supabase
            .from('resumes')
            .insert([{ projects: [] }])
            .select()

        if (insertError) {
            console.log('Projects column likely MISSING. Error:', insertError.message)
        } else {
            console.log('Projects column EXISTS.')
        }
    }
}

checkColumns()
