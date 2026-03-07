const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://esfwrnaqimzejcxsuxna.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzZndybmFxaW16ZWpjeHN1eG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NTE0NDksImV4cCI6MjA4ODQyNzQ0OX0.VSnB3E3IGu57duQL6A0EVaGYg1gMQrBHNYhKRP8hia0'

const supabase = createClient(supabaseUrl, supabaseKey)

async function getFullSchema() {
    console.log("Fetching a single row to inspect keys...");
    const { data: rowData, error: rowError } = await supabase
        .from('resumes')
        .select('*')
        .limit(1);

    if (rowData && rowData.length > 0) {
        console.log("Columns found:", Object.keys(rowData[0]));
        console.log("Row Data:", rowData[0]);
    } else {
        console.log("Still empty? Error:", rowError);
    }

    // Cleanup the mess I just made
    await supabase.from('resumes').delete().eq('user_id', '00000000-0000-0000-0000-000000000000')
}

getFullSchema()
