import { ArrowLeft, Reply, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Email {
  subject: string;
  from: string;
  body: string;
}

interface EmailViewProps {
  email: Email | null;
  onClose: () => void;
}

export default function EmailView({ email, onClose }: EmailViewProps) {
  if (!email) return null

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" onClick={onClose}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div>
          <Button variant="ghost" className="mr-2">
            <Reply className="mr-2 h-4 w-4" />
            Reply
          </Button>
          <Button variant="ghost">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <h2 className="text-2xl font-bold mb-2">{email.subject}</h2>
        <p className="text-sm text-gray-600 mb-4">From: {email.from}</p>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: email.body }} />
      </ScrollArea>
    </div>
  )
}