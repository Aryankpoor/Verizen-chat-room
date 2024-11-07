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
      const request = await fetch("/api/invoices/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invoiceID: id,
          items: invoice?.items,
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
          <button
            className="p-3 text-blue-50 bg-cyan-600 rounded-md flex items-center"
            onClick={() => reactToPrintFn()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              className="mr-2"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="currentColor"
                d="M1 14.5a6.496 6.496 0 0 1 3.064-5.519 8.001 8.001 0 0 1 15.872 0 6.5 6.5 0 0 1-2.936 12L7 21c-3.356-.274-6-3.078-6-6.5zm15.848 4.487a4.5 4.5 0 0 0 2.03-8.309l-.807-.503-.12-.942a6.001 6.001 0 0 0-11.903 0l-.12.942-.805.503a4.5 4.5 0 0 0 2.029 8.309l.173.013h9.35l.173-.013zM13 12h3l-4 5-4-5h3V8h2v4z"
              />
            </svg>
            Download
          </button>
          <button
            className="p-3 text-blue-50 bg-green-500 rounded-md flex items-center"
            onClick={() => {
              setDisabled(true)
              handleSendInvoice()
            }}
            disabled={disabled}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              className="mr-2"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
              />
            </svg>
            {disabled ? "Sending..." : "Send"}
          </button>
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