import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ExtractedDataProps = {
  data: {
    invoiceNumber: string
    date: string
    total: string
    vendor: string
  }
}

export default function ExtractedData({ data }: ExtractedDataProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Extracted Invoice Data</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </CardContent>
    </Card>
  )
}