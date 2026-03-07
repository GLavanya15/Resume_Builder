'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveResume(
    personalInfo: any,
    education: any[],
    experience: any[],
    projects: any[],
    skills: string[],
    generatedContent: string
) {
    const supabase = createClient()

    // Get the user ID from auth
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user?.id

    const { data, error } = await supabase
        .from('resumes')
        .insert([
            {
                personal_info: { ...personalInfo, projects }, // Workaround for missing column
                education: education,
                experience: experience,
                skills: skills,
                generated_content: generatedContent,
                user_id: userId
            },
        ])
        .select()

    if (error) {
        console.error('Error saving resume:', error)
        return { success: false, error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true, data }
}
