'use client'

import { ChangeEvent, useEffect, useState, useCallback } from "react"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PulsatingButton from "@/components/ui/pulsating-button"

export default function Component() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [bankInfo, setBankInfo] = useState({
    account_name: "",
    account_number: "",
    bank_name: "",
    currency: "",
  })
  const [inputBankInfo, setInputBankInfo] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    currency: "",
  })

  const fetchBankInfo = useCallback(async () => {
    if (!user?.id) return
    try {
      const response = await fetch(`/api/bank-info?userID=${user.id}`)
      const data = await response.json()
      if (data && data.bankInfo && data.bankInfo[0]) {
        setBankInfo(data.bankInfo[0])
      }
    } catch (err) {
      console.error(err)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      fetchBankInfo()
    }
  }, [user, fetchBankInfo])

  const handleUpdateBankInfo = (e: ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setInputBankInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/bank-info", {
        method: "POST",
        body: JSON.stringify({ userID: user?.id, ...inputBankInfo }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      if (data) {
        alert(data.message)
        fetchBankInfo()
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (!isLoaded || !isSignedIn) {
    return <p>Loading...</p>
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Bank Information</CardTitle>
          <CardDescription>Update your bank account information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {bankInfo.account_name && (
              <Card>
                <CardHeader>
                  <CardTitle>Current Bank Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-2 text-sm">
                    <dt className="font-medium">Account Name:</dt>
                    <dd>{bankInfo.account_name}</dd>
                    <dt className="font-medium">Account Number:</dt>
                    <dd>{bankInfo.account_number}</dd>
                    <dt className="font-medium">Bank Name:</dt>
                    <dd>{bankInfo.bank_name}</dd>
                    <dt className="font-medium">Currency:</dt>
                    <dd>{bankInfo.currency}</dd>
                  </dl>
                </CardContent>
              </Card>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accountName">Account Name</Label>
                <Input
                  id="accountName"
                  name="accountName"
                  value={inputBankInfo.accountName}
                  onChange={handleUpdateBankInfo}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  name="accountNumber"
                  type="number"
                  value={inputBankInfo.accountNumber}
                  onChange={handleUpdateBankInfo}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  name="bankName"
                  value={inputBankInfo.bankName}
                  onChange={handleUpdateBankInfo}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select name="currency" value={inputBankInfo.currency} onValueChange={(value) => handleUpdateBankInfo({ target: { name: 'currency', value } })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="$">USD</SelectItem>
                    <SelectItem value="€">EUR</SelectItem>
                    <SelectItem value="£">GBP</SelectItem>
                    <SelectItem value="CA$">CAD</SelectItem>
					          <SelectItem value="₹">INR</SelectItem>
                    <SelectItem value="AU$">AUD</SelectItem>
                    <SelectItem value="¥">CNY</SelectItem>
                    <SelectItem value="JP¥">JPY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end">
                <PulsatingButton type="submit" className="w-full sm:w-auto">
                  Update Bank Info
                </PulsatingButton>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}