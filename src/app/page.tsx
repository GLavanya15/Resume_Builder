import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Rocket, Zap, Target, FileText } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Simple Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-primary/10 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">AI Resume Maker</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost" className="font-medium hover:text-primary">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button className="font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">Sign Up</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Craft your perfect ATS-friendly resume in minutes.
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto italic">
            Input your details and let our AI summarize, format, and optimize your resume to stand out to recruiters and pass ATS systems with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/create">
              <Button size="lg" className="px-8 bg-primary hover:bg-primary/90 text-lg shadow-xl shadow-primary/20">
                Build My Resume
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="px-8 border-primary/20 hover:bg-primary/5 text-lg">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/50 border-y border-primary/10">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-primary/10 bg-background/50">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Fill out our multi-step form and generate a comprehensive resume instantly with the help of powerful AI models.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-primary/10 bg-background/50">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">ATS-Optimized</h3>
              <p className="text-muted-foreground">
                The AI ensures your resume uses the right keywords and structure to pass Applicant Tracking Systems.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-primary/10 bg-background/50">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Beautiful Exports</h3>
              <p className="text-muted-foreground">
                View your beautiful new resume right in the browser and effortlessly print to PDF with clean styling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-primary/10">
        <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">AI Resume Maker</span>
          </div>
          <p className="text-muted-foreground italic">
            © 2026 AI Resume Maker. Made with 🚀
          </p>
        </div>
      </footer>
    </div>
  )
}
