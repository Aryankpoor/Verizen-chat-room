'use client'

import { useCallback, useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, Trash2, UserPlus, Users } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Customer {
  id: string
  name: string
  email: string
  address: string
}

export default function Component() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerAddress, setCustomerAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const fetchCustomers = useCallback(async () => {
    if (!user?.id) return
    try {
      const res = await fetch(`/api/customers?userID=${user.id}`)
      const data = await res.json()
      setCustomers(data.customers)
    } catch (err) {
      console.error("Failed to fetch customers:", err)
      setAlert({ type: 'error', message: 'Failed to fetch customers. Please try again.' })
    }
  }, [user])

  useEffect(() => {
    if (user) {
      fetchCustomers()
    }
  }, [fetchCustomers, user])

  const createCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        body: JSON.stringify({
          userID: user?.id,
          customerName,
          customerEmail,
          customerAddress,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      setAlert({ type: 'success', message: data.message })
      setCustomerName("")
      setCustomerEmail("")
      setCustomerAddress("")
      fetchCustomers()
    } catch (err) {
      console.error("Failed to create customer:", err)
      setAlert({ type: 'error', message: 'Failed to create customer. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const deleteCustomer = async (customerId: string) => {
    try {
      const response = await fetch(`/api/customers/${customerId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID: user?.id }),
      })
      const data = await response.json()
      setAlert({ type: 'success', message: data.message })
      fetchCustomers()
    } catch (err) {
      console.error("Failed to delete customer:", err)
      setAlert({ type: 'error', message: 'Customer deletion is not available yet!' })
    }
  }

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <UserPlus className="w-6 h-6" />
              Add New Customer
            </CardTitle>
            <CardDescription>Enter customer details to add them to your list</CardDescription>
          </CardHeader>
          <CardContent>
            {alert && (
              <Alert 
                variant={alert.type === 'error' ? "destructive" : "default"} 
                className={`mb-6 ${alert.type === 'success' ? 'bg-green-100 border-green-500 text-green-800' : ''}`}
              >
                <AlertTitle>{alert.type === 'error' ? "Error" : "Success"}</AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={createCustomer} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer&apos;s Name</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Email Address</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="Enter email address of customer"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerAddress">Billing Address</Label>
                <Textarea
                  id="customerAddress"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Enter customer's billing address"
                  required
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding Customer
                  </>
                ) : (
                  "Add Customer"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Users className="w-6 h-6" />
              Customer List
            </CardTitle>
            <CardDescription>View and manage your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.address}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteCustomer(customer.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete customer</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}