import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized', details: authError }, { status: 401 })
    }

    const { data, error } = await supabase
        .from('resumes')
        .insert([{
            personal_info: { name: 'Test', email: 'test@example.com' },
            education: [],
            experience: [],
            skills: [],
            generated_content: 'Test content',
            user_id: user.id
        }])
        .select()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
}
