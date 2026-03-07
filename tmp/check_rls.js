const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://esfwrnaqimzejcxsuxna.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzZndybmFxaW16ZWpjeHN1eG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NTE0NDksImV4cCI6MjA4ODQyNzQ0OX0.VSnB3E3IGu57duQL6A0EVaGYg1gMQrBHNYhKRP8hia0'
// Use service role key if needed, or we might not be able to read pg_policies with anon key.
// But wait, the RLS error happens during insert. 

// Just do a simple node-postgres query or check if RPC exists. 
// Since we don't have direct DB connection string (postgres://...), maybe we can't query pg_policies.

// Let's create a JWT for a random user (using local test) and see what happens.
// Wait! If the user_id is the problem, what if we check the DB schema again for the `user_id` column type? Is it UUID or auth.uid()?

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkRLS() {
    console.log("Without user context, inserting usually fails due to RLS.");
    const { data: dbData, error: dbError } = await supabase
        .from('resumes')
        .insert([{
            user_id: 'fcd11b34-10b6-493b-ae42-2d10dc34d72f', // fake uuid
            personal_info: { name: 'test' },
            generated_content: 'test'
        }])
        .select()

    console.log("Anon Insert Error:", dbError);
}

checkRLS()
