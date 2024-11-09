'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExternalLink } from 'lucide-react'

interface CredentialsFormProps {
  onSubmit: (credentials: { email: string, password: string, imapHost: string }) => void
}

export default function CredentialsForm({ onSubmit }: CredentialsFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imapHost, setImapHost] = useState('imap.gmail.com')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ email, password, imapHost })
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Gmail Login</CardTitle>
        <CardDescription>Enter your Gmail credentials to access your inbox</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Alert className="mb-4">
            <AlertTitle className="flex items-center gap-2">
              Important: App Password Required
              <a 
                href="https://support.google.com/accounts/answer/185833"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary inline-flex items-center hover:underline"
              >
                Learn More <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </AlertTitle>
            <AlertDescription>
              <p className="mb-2">To use this app with Gmail, you need to:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Enable 2-Step Verification in your Google Account</li>
                <li>Generate an App Password for this application</li>
                <li>Use that App Password instead of your regular password</li>
              </ol>
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <Label htmlFor="email">Gmail Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your.email@gmail.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">App Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="16-character app password"
            />
          </div>
          <Input
            id="imapHost"
            type="hidden"
            value={imapHost}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Connect to Gmail</Button>
        </CardFooter>
      </form>
    </Card>
  )
}