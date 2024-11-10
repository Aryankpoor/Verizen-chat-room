'use client'

import React, { useRef, useEffect, useCallback, useState } from "react"
import { useReactToPrint } from "react-to-print"
import InvoiceTable from "@/app/components/InvoiceTable"
import { useUser } from "@clerk/nextjs"
import { useParams, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Send } from "lucide-react"

const formatDateString = (dateString: string): string => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString("default", { month: "long" })
  const year = date.getFullYear()

  return `${day} ${month}, ${year}`
}

export default function Invoices() {
  const { isLoaded, isSignedIn, user } = useUser()
  const { id } = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const [customer, setCustomer] = useState<Customer | undefined>()
  const [bankInfo, setBankInfo] = useState<BankInfo | undefined>()
  const [invoice, setInvoice] = useState<Invoice | undefined>()
  const [disabled, setDisabled] = useState<boolean>(false)
  const name = searchParams.get("customer") as string
  const contentRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({ contentRef })

  async function fetchData<T>(endpoint: string): Promise<T> {
    const response = await fetch(endpoint)
    if (!response.ok) {
      throw new Error(`Failed to fetch from ${endpoint}: ${response.statusText}`)
    }
    return response.json()
  }

  const getAllInvoiceData = useCallback(async () => {
    try {
      const [customerData, bankInfoData, invoiceData] = await Promise.all([
        fetchData<any>(`/api/customers/single?name=${name}`),
        fetchData<any>(`/api/bank-info?userID=${user?.id}`),
        fetchData<any>(`/api/invoices/single?id=${id}`),
      ])
      setCustomer(customerData?.customer[0])
      setBankInfo(bankInfoData?.bankInfo[0])
      setInvoice(invoiceData?.invoice[0])
    } catch (err) {
      console.error(err)
    }
  }, [id, name, user])

  useEffect(() => {
    getAllInvoiceData()
  }, [id, name, user, getAllInvoiceData])

  const handleSendInvoice = async () => {
    try {
      setDisabled(true)
      const request = await fetch("/api/invoices/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invoiceID: id,
          items: invoice?.items, // Send items as is, don't stringify here
          title: invoice?.title,
          amount: invoice?.total_amount,
          customerEmail: customer?.email,
          customerAddress: customer?.address,
          customerName: customer?.name,
          issuerName: bankInfo?.account_name,
          accountNumber: bankInfo?.account_number,
          currency: bankInfo?.currency,
        }),
      })
      const response = await request.json()
      setDisabled(false)
      alert(response.message)
    } catch (err) {
      console.error(err)
      setDisabled(false)
      alert("Failed to send invoice. Please try again.")
    }
  }

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Invoice #{id}</h1>
        <div className="flex space-x-4">
          <Button onClick={() => reactToPrintFn()} className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button
            onClick={handleSendInvoice}
            disabled={disabled}
            className="flex items-center"
          >
            <Send className="mr-2 h-4 w-4" />
            {disabled ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
      <Card className="w-full mx-auto shadow-lg" ref={contentRef}>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">From:</h2>
              <p>{bankInfo?.account_name}</p>
              <p>Date: {formatDateString(invoice?.created_at!)}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">To:</h2>
              <p>{customer?.name}</p>
              <p>{customer?.address}</p>
              <p>{customer?.email}</p>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Invoice Details:</h2>
            <p>Subject: {invoice?.title}</p>
            <p className="text-2xl font-bold mt-2">
              Total: {bankInfo?.currency}
              {Number(invoice?.total_amount).toLocaleString()}
            </p>
          </div>
          {invoice?.items && <InvoiceTable itemList={JSON.parse(invoice.items)} />}
        </CardContent>
      </Card>
    </div>
  )
}