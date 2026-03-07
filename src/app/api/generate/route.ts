import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { streamText } from 'ai'
import { saveResume } from '@/app/actions/resume'

const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
})

export async function POST(req: Request) {
    try {
        const { personalInfo, education, experience, skills } = await req.json()

        // Craft a highly specific prompt for resume generation
        const systemPrompt = `You are an expert resume writer. 
    Your goal is to take the provided user information (Education, Experience, Skills, and Personal Info) 
    and output a highly professional, concisely written, and impactful resume formatted entirely in Markdown.
    
    Guidelines:
    - Use clear headings (## Summary, ## Experience, ## Education, ## Skills).
    - Under Experience, write strong bullet points starting with action verbs. Quantify achievements if possible.
    - Output ONLY the Markdown content of the resume. Do not include introductory or concluding conversational text.
    - Format it beautifully and logically.`

        const userPrompt = `
      Personal Information: ${JSON.stringify(personalInfo)}
      Education: ${JSON.stringify(education)}
      Experience: ${JSON.stringify(experience)}
      Skills: ${JSON.stringify(skills)}
    `

        const result = await streamText({
            model: openrouter('nvidia/llama-3.1-nemotron-70b-instruct:free'),
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
        })

        return result.toTextStreamResponse()
    } catch (error) {
        console.error('Error generating resume:', error)
        return new Response(JSON.stringify({ error: 'Failed to generate resume' }), {
            status: 500,
        })
    }
}
