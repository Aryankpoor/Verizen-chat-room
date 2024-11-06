'use client'

import { useState, useEffect } from 'react'
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react"
import { Mail, Inbox, Send, File, Trash2, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import EmailView from '../components/EmailView'
import ComposeEmail from '../components/ComposeEmail'

function EmailClientContent() {
  const { data: session } = useSession()
  interface Email {
    id: string;
    subject: string;
    from: string;
    snippet: string;
  }

  const [emails, setEmails] = useState<Email[]>([])
  const [selectedFolder, setSelectedFolder] = useState('Inbox')
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null)
  const [selectedEmailData, setSelectedEmailData] = useState(null)
  const [isComposeOpen, setIsComposeOpen] = useState(false)

  const folders = [
    { name: "Inbox", icon: Inbox },
    { name: "Sent", icon: Send },
    { name: "Drafts", icon: File },
    { name: "Trash", icon: Trash2 },
  ]

  useEffect(() => {
    if (session) {
      fetchEmails()
    }
  }, [session, selectedFolder])

  const fetchEmails = async () => {
    try {
      const response = await fetch('/api/emails')
      const data = await response.json()
      setEmails(data)
    } catch (error) {
      console.error('Error fetching emails:', error)
    }
  }

  const fetchEmailDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/emails/${id}`)
      const data = await response.json()
      setSelectedEmailData(data)
    } catch (error) {
      console.error('Error fetching email details:', error)
    }
  }

  useEffect(() => {
    if (selectedEmail) {
      fetchEmailDetails(selectedEmail)
    }
  }, [selectedEmail])

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Button onClick={() => signIn('google')}>Sign in with Google</Button>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-4">
        <Button className="w-full mb-4" onClick={() => setIsComposeOpen(true)}>Compose</Button>
        <nav>
          {folders.map((folder) => (
            <Button 
              key={folder.name} 
              variant={selectedFolder === folder.name ? "default" : "ghost"} 
              className="w-full justify-start mb-1"
              onClick={() => setSelectedFolder(folder.name)}
            >
              <folder.icon className="mr-2 h-4 w-4" />
              {folder.name}
            </Button>
          ))}
        </nav>
        <Separator className="my-4" />
        <Button variant="ghost" className="w-full justify-start" onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Search Bar */}
        <div className="bg-white p-4">
          <Input type="search" placeholder="Search emails..." className="w-full" />
        </div>

        {selectedEmailData ? (
          <EmailView 
            email={selectedEmailData} 
            onClose={() => {
              setSelectedEmailData(null)
              setSelectedEmail(null)
            }} 
          />
        ) : (
          /* Email List */
          <ScrollArea className="flex-1">
            {emails.map((email) => (
              <div 
                key={email.id} 
                className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${selectedEmail === email.id ? 'bg-blue-100' : ''}`}
                onClick={() => setSelectedEmail(email.id)}
              >
                <h3 className="font-semibold">{email.subject}</h3>
                <p className="text-sm text-gray-600">{email.from}</p>
                <p className="text-sm text-gray-500 truncate">{email.snippet}</p>
              </div>
            ))}
          </ScrollArea>
        )}
      </div>

      <ComposeEmail isOpen={isComposeOpen} onClose={() => setIsComposeOpen(false)} />
    </div>
  )
}

export default function EmailClientWrapper() {
  return (
    <SessionProvider>
      <EmailClientContent />
    </SessionProvider>
  )
}