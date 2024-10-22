import Link from "next/link";
import { getDBVersion } from "./db";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import * as React from "react"
import { BorderBeam } from "@/components/ui/border-beam";
import { Progress } from "@/components/ui/progress"
import { useTheme } from "next-themes";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import ShineBorder from "@/components/ui/shine-border";


export default async function Home() {
  
  const { version } = await getDBVersion();
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]
   
    console.log({version})
  return (
    <main className='w-full'>
      <div className='p-5 h-[70vh] md:w-2/3 mx-auto text-center flex flex-col items-center justify-center rain'>
      <NeonGradientCard className="max-w-lg">
      <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8 )]">
        Create Dynamic Invoices
      </span>
    </NeonGradientCard>
    <br />
    <br />
    <br />
    <br />
    <br />
        <h2 className='text-3xl font-bold mb-4 md:text-4xl'>
        Welp is an open source invoicing system that allows you to create 
        invoices for your customers. It is built with Next.js, and TailWind CSS.
        </h2>
       
       <br />
        <Link
          href='/dashboard'
          className='rounded w-[200px] px-2 py-3 bg-blue-500 text-gray-50'
        >
          LOG IN
        </Link>
      </div>
      
      <br />
      <br />
      <section>
      <div className="ttable">
      <div className="t-head">
        <h1 className="scroll-m-20 border-b pb-2 text-5xl font-semibold tracking-tight first:mt-0">
        Create and Manage your invoices like a pro, all in one place
      </h1>
      <br />
        </div>
      <div className="t-body">
      <Table>
      
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
      </div>
      
      </div>
      
      </section>
      <br />
      <section>
        <div className="dev">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        The website is still in development stage
      </h1>
        </div>
      
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Please test the website out and let me know if you find any bugs or issues. You can also contribute to the project by submitting a pull
         request on GitHub. The links have been provided in the footer section of the website. Till then, here is how much the website has progressed so far.
      </p>
      <br />
      <div className="prog">
      <Progress value={73} />
      </div>
      
      <br/>
      </section>

    
    </main>
  );
}