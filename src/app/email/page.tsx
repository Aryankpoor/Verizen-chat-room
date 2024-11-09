'use client'

import { useState } from 'react'
import CredentialsForm from './credentials-form'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ReloadIcon } from "@radix-ui/react-icons"

export default function EmailPage() {
  const [emails, setEmails] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [credentials, setCredentials] = useState<{ email: string, password: string, imapHost: string } | null>(null)

  const handleCredentialsSubmit = async (creds: { email: string, password: string, imapHost: string }) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch emails')
      }

      const data = await response.json()
      setEmails(data)
      setCredentials(creds)
    } catch (err) {
      setError('An error occurred while fetching emails. Please check your credentials and try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    if (credentials) {
      handleCredentialsSubmit(credentials)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Email Client</h1>
      {!credentials ? (
        <CredentialsForm onSubmit={handleCredentialsSubmit} />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Emails</h2>
            <Button onClick={handleRefresh} disabled={isLoading}>
              {isLoading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing
                </>
              ) : (
                'Refresh'
              )}
            </Button>
          </div>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {isLoading ? (
            <p>Loading...</p>
          ) : emails.length > 0 ? (
            <ul>
              {emails.map((email: any) => (
                <li key={email.uid} className="mb-2 p-2 border rounded">
                  <span className="font-semibold">{email.subject}</span>
                  <span className="ml-2 text-gray-500">{email.from}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No emails found.</p>
          )}
        </div>
      )}
    </div>
  )
}