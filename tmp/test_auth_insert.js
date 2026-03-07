const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://esfwrnaqimzejcxsuxna.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzZndybmFxaW16ZWpjeHN1eG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NTE0NDksImV4cCI6MjA4ODQyNzQ0OX0.VSnB3E3IGu57duQL6A0EVaGYg1gMQrBHNYhKRP8hia0'
const supabase = createClient(supabaseUrl, supabaseKey)

async function testAuthInsert() {
    // login we made earlier or make a new one
    const email = 'test_user_' + Date.now() + '@example.com'
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: 'securepassword123',
    })

    if (authError) {
        console.log("Signup failed:", authError.message)
        return
    }

    const userId = authData.user.id
    console.log("Logged in UID:", userId)

    // Test exactly what the API does
    const { data, error } = await supabase
        .from('resumes')
        .insert([{
            personal_info: { name: 'Test', email, projects: [] },
            education: [],
            experience: [],
            skills: ['JS'],
            generated_content: 'Test content',
            user_id: userId
        }])
        .select()

    if (error) {
        console.error("Auth Insert Error:", error.message)
        console.error("Error details:", error.details, error.hint)
    } else {
        console.log("Successfully inserted via auth:", data)
    }
}

testAuthInsert();
