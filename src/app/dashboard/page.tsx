import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, PlusCircle, LogOut } from 'lucide-react'
import { logout } from '@/app/auth/actions'

export const revalidate = 0

export default async function Dashboard() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-8">
                <p>Please log in to view your dashboard.</p>
                <Link href="/login" className="mt-4">
                    <Button>Login</Button>
                </Link>
            </div>
        )
    }

    const { data: resumes, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching resumes:', error)
    }

    return (
        <div className="flex flex-col min-h-screen p-4 md:p-8 bg-background">
            <div className="max-w-6xl w-full mx-auto space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-card p-6 rounded-2xl shadow-sm border border-primary/10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Your Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Logged in as {user.email}</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/dashboard/create">
                            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                                <PlusCircle className="h-5 w-5" />
                                Create New
                            </Button>
                        </Link>
                        <form action={logout}>
                            <Button variant="outline" size="lg" className="gap-2 border-primary/20 hover:bg-primary/10">
                                <LogOut className="h-5 w-5" />
                                Logout
                            </Button>
                        </form>
                    </div>
                </div>

                {resumes && resumes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.map((resume) => (
                            <Card key={resume.id} className="hover:shadow-lg transition-all group overflow-hidden border-primary/10 bg-card/50">
                                <CardHeader className="bg-primary/5 pb-4">
                                    <div className="flex items-start justify-between">
                                        <FileText className="h-8 w-8 text-primary shadow-sm" />
                                        <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded-full border border-primary/10">
                                            {new Date(resume.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <CardTitle className="mt-4 text-xl">
                                        Resume {resume.name ? resume.name : (resume.personal_info as any)?.name ? `${(resume.personal_info as any).name}` : `#${resume.id.substring(0, 6)}`}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {resume.generated_content?.substring(0, 150)}...
                                    </p>
                                </CardContent>
                                <CardFooter className="bg-primary/5 border-t border-primary/5 p-4 flex gap-2">
                                    <Link href={`/dashboard/resume/${resume.id}`} className="w-full">
                                        <Button variant="secondary" className="w-full bg-secondary hover:bg-secondary/80">View Details</Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-12 bg-card rounded-2xl border border-dashed border-primary/20 text-center">
                        <div className="h-20 w-20 bg-primary/10 rounded-full flex flex-col items-center justify-center mb-4 text-primary">
                            <FileText className="h-10 w-10 opacity-80" />
                        </div>
                        <h3 className="text-xl font-medium">No resumes yet</h3>
                        <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
                            You haven't generated any resumes. Create your professional resume with AI now.
                        </p>
                        <Link href="/dashboard/create">
                            <Button className="bg-primary hover:bg-primary/90">Create your first resume</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
