const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://esfwrnaqimzejcxsuxna.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzZndybmFxaW16ZWpjeHN1eG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NTE0NDksImV4cCI6MjA4ODQyNzQ0OX0.VSnB3E3IGu57duQL6A0EVaGYg1gMQrBHNYhKRP8hia0'
const supabase = createClient(supabaseUrl, supabaseKey)

async function testAuth() {
    console.log("Attempting to sign up a google email test user...");
    const { data, error } = await supabase.auth.signUp({
        email: 'testuser12345678@gmail.com',
        password: 'securepassword123',
    })

    if (error) {
        console.error("Signup failed:", error.message);
    } else {
        console.log("Signup success:", data.user?.id);
    }
}

testAuth();
