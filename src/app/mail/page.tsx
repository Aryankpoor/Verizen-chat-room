import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function Extract() {
    return (
        <main>
            <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Whoops!</AlertTitle>
      <AlertDescription>
        This feature is not yet available.
      </AlertDescription>
    </Alert>
        </main>
    );
}