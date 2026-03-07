import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ExportPdfButton } from '@/components/ExportPdfButton'

export const revalidate = 0

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function ResumeView({ params }: { params: { id: string } }) {
    const supabase = createClient()

    const { data: resume, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', params.id)
        .single()

    if (error || !resume) {
        console.error('Error fetching resume:', error)
        notFound()
    }

    return (
        <div className="flex flex-col min-h-screen bg-muted/10">

            {/* Top Action Bar */}
            <div className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-md border-b flex justify-between items-center px-6 py-4">
                <Link href="/dashboard">
                    <Button variant="ghost" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </Link>
                <div className="flex gap-2">
                    <ExportPdfButton />
                </div>
            </div>

            <div className="max-w-4xl w-full mx-auto py-12 px-4 shadow-2xl bg-white my-8 printable-resume">
                <div className="prose prose-stone prose-sm sm:prose-base max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {resume.generated_content || 'No content generated.'}
                    </ReactMarkdown>
                </div>
            </div>

        </div>
    )
}
