const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://esfwrnaqimzejcxsuxna.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzZndybmFxaW16ZWpjeHN1eG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NTE0NDksImV4cCI6MjA4ODQyNzQ0OX0.VSnB3E3IGu57duQL6A0EVaGYg1gMQrBHNYhKRP8hia0'
const supabase = createClient(supabaseUrl, supabaseKey)

async function run() {
    // Generate a strictly valid email
    const email = `testuser${Date.now()}@test.com`
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: 'SecurePassword123!',
    })

    if (authError) {
        console.log("Signup failed:", authError.message)
        return
    }

    const userId = authData.user.id
    console.log("Logged in UID:", userId)

    // Try inserting WITH user_id
    const { data: data1, error: error1 } = await supabase
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

    console.log("Insert WITH user_id Error:", error1 ? error1.message : "Success")

    // Try inserting WITHOUT user_id (relying on default if it exists)
    const { data: data2, error: error2 } = await supabase
        .from('resumes')
        .insert([{
            personal_info: { name: 'Test', email, projects: [] },
            education: [],
            experience: [],
            skills: ['JS'],
            generated_content: 'Test content 2'
        }])
        .select()

    console.log("Insert WITHOUT user_id Error:", error2 ? error2.message : "Success")
}

run();
