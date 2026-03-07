'use client'

import { useState } from 'react'
import Link from 'next/link'
import { login } from '@/app/auth/actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

export default function LoginPage({ searchParams }: { searchParams: { message: string } }) {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-background">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

            {searchParams?.message && (
                <div className="mb-4 p-4 rounded-md bg-destructive/15 text-destructive border border-destructive/20 max-w-md w-full text-center text-sm font-medium">
                    {searchParams.message}
                </div>
            )}

            <Card className="w-full max-w-md border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight text-center">Login</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email and password to access your dashboard.
                    </CardDescription>
                </CardHeader>
                <form action={async (formData) => {
                    setIsLoading(true)
                    await login(formData)
                    setIsLoading(false)
                }}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="m@example.com" required className="bg-white text-black" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required className="bg-white text-black" />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Login
                        </Button>
                        <div className="text-center text-sm">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup" className="text-primary hover:underline underline-offset-4">
                                Sign up
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
