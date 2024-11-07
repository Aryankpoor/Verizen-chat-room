"use client"

import React, { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader2 } from "lucide-react"

interface Item {
  id: string
  name: string
  cost: number
  quantity: number
  price: number
}

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [itemList, setItemList] = useState<Item[]>([])
  const [customer, setCustomer] = useState<string>("")
  const [invoiceTitle, setInvoiceTitle] = useState<string>("")
  const [itemCost, setItemCost] = useState<number>(1)
  const [itemQuantity, setItemQuantity] = useState<number>(1)
  const [itemName, setItemName] = useState<string>("")
  const [customers, setCustomers] = useState([])
  const [bankInfoExists, setBankInfoExists] = useState<boolean>(false)
  const router = useRouter()

  const fetchBankInfo = useCallback(async () => {
    try {
      const response = await fetch(`/api/bank-info?userID=${user?.id}`)
      const data = await response.json()
      if (data?.bankInfo[0]) {
        setBankInfoExists(true)
      }
    } catch (err) {
      console.error(err)
    }
  }, [user])

  const fetchCustomers = useCallback(async () => {
    try {
      const res = await fetch(`/api/customers?userID=${user?.id}`)
      const data = await res.json()
      setCustomers(data.customers)
    } catch (err) {
      console.log(err)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      fetchBankInfo()
      if (bankInfoExists) {
        fetchCustomers()
      }
    }
  }, [fetchCustomers, user, fetchBankInfo, bankInfoExists])

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (itemName.trim() && itemCost > 0 && itemQuantity >= 1) {
      setItemList([
        ...itemList,
        {
          id: Math.random().toString(36).substring(2, 9),
          name: itemName,
          cost: itemCost,
          quantity: itemQuantity,
          price: itemCost * itemQuantity,
        },
      ])
    }

    setItemName("")
    setItemCost(0)
    setItemQuantity(0)
  }

  const getTotalAmount = () => {
    return itemList.reduce((total, item) => total + item.price, 0)
  }

  const createInvoice = async () => {
    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer,
          title: invoiceTitle,
          items: itemList,
          total: getTotalAmount(),
          ownerID: user?.id,
        }),
      })
      const data = await res.json()
      alert(data.message)
      router.push("/history")
    } catch (err) {
      console.log(err)
    }
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createInvoice()
  }

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <main className="min-h-[90vh]">
        {!bankInfoExists ? (
          <Card className="mx-auto max-w-md">
            <CardHeader>
              <CardTitle>Welcome!</CardTitle>
              <CardDescription>
                Please add your bank information to start using the application.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/settings">Add Bank Info</Link>
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Add New Invoice</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  {customers.length > 0 ? (
                    <Select
                      required
                      value={customer}
                      onValueChange={(value) => setCustomer(value)}
                    >
                      <SelectTrigger id="customer">
                        <SelectValue placeholder="Select Customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map((customer: any) => (
                          <SelectItem key={customer.id} value={customer.name}>
                            {customer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-destructive">
                      No customers found. Please add a customer.
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    required
                    value={invoiceTitle}
                    onChange={(e) => setInvoiceTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Items List</h3>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="itemName">Name</Label>
                      <Input
                        id="itemName"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        placeholder="Item name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="itemCost">Cost</Label>
                      <Input
                        id="itemCost"
                        type="number"
                        value={itemCost}
                        onChange={(e) => setItemCost(Number(e.target.value))}
                        placeholder="Cost"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="itemQuantity">Quantity</Label>
                      <Input
                        id="itemQuantity"
                        type="number"
                        value={itemQuantity}
                        onChange={(e) => setItemQuantity(Number(e.target.value))}
                        placeholder="Quantity"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Price</Label>
                      <Input
                        value={Number(itemCost * itemQuantity).toLocaleString("en-US")}
                        readOnly
                      />
                    </div>
                  </div>
                  <Button type="button" onClick={handleAddItem}>
                    Add Item
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itemList.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.cost.toLocaleString("en-US")}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.price.toLocaleString("en-US")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Button type="submit" className="w-full">
                  Save & Preview Invoice
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}