import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ComposeEmailProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComposeEmail({ isOpen, onClose }: ComposeEmailProps) {
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the email using an API
    console.log('Sending email:', { to, subject, body })
    // Reset form and close dialog
    setTo('')
    setSubject('')
    setBody('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Compose Email</DialogTitle>
          <Button variant="ghost" onClick={onClose} className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <Textarea
            placeholder="Write your message here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            className="h-32"
          />
          <Button type="submit" className="w-full">Send</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}