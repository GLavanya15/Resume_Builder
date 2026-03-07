const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://esfwrnaqimzejcxsuxna.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzZndybmFxaW16ZWpjeHN1eG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NTE0NDksImV4cCI6MjA4ODQyNzQ0OX0.VSnB3E3IGu57duQL6A0EVaGYg1gMQrBHNYhKRP8hia0'
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkStorage() {
    const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    if (error) {
        console.error("Fetch DB error:", error);
    } else {
        console.log("Recent DB Entries:", data.length);
        if (data.length > 0) {
            console.log("Sample User ID:", data[0].user_id);
            console.log("Has personal info?", !!data[0].personal_info);
            console.log("Has generated content?", !!data[0].generated_content);
        }
    }
}

checkStorage();
