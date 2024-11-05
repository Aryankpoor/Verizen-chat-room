import Link from "next/link";
import { getDBVersion } from "./db";
import {User} from "@nextui-org/user";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import * as React from "react"
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { Section, Row, Column, Img, Text, Hr} from "@react-email/components";
import HyperText from "@/components/ui/hyper-text";
import BlurIn from "@/components/ui/blur-in";

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
        <BlurIn word="WELP IS AN OPEN SOURCE INVOICING SYSTEM THAT ALLOWS YOU TO CREATE 
        INVOICES FOR YOUR CUSTOMERS. IT IS BUILT WITH NEXT.JS, AND TAILWIND" className='text-3xl font-bold mb-4 md:text-4xl' />

       
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
      <HyperText className="scroll-m-20 border-b pb-2 text-5xl font-semibold tracking-tight first:mt-0" text="Create and Manage your invoices like a pro, all in one place"/>
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
        <BlurIn word="Welp is currently in testing stage. Please test the website out and let me know if you find any bugs or issues. You can also contribute to the project by submitting a pull
        request on GitHub. There are still issues coming up here and there and we are working on fixing them." className="text-3xl font-bold mb-4 md:text-4xl" />
        </div>
      
      </section>
      <Hr
    style={{
      marginTop: 16,
      borderColor: "rgb(209,213,219)",
      marginBottom: 16,
      borderTopWidth: 2,
    }}
  />
      <Section>
  <Row>
    <Column colSpan={4}>
      
      <Text
        style={{
          marginTop: 8,
          marginBottom: 8,
          fontSize: 32,
          lineHeight: "48px",
          fontWeight: 600,
          color: "rgb(17,24,39)",
        }}
      >
        Welp
      </Text>
      <Text
        style={{
          marginTop: 4,
          marginBottom: "0px",
          fontSize: 32,
          lineHeight: "36px",
          color: "rgb(107,114,128)",
        }}
      >
        Copyright 2024
      </Text>
    </Column>
    <Column
      align="left"
      style={{ display: "table-cell", verticalAlign: "bottom" }}
    >
      <Text
          style={{
            marginTop: 4,
            marginBottom: "0px",
            fontSize: 16,
            lineHeight: "48px",
            fontWeight: 600,
            color: "rgb(107,114,128)",
          }}
        >
          Developed by
        </Text>
      
      <Row>
      <User   
      name="Aryan Kapoor"
      description={(
        <Link href="https://www.aryankap.com">
          @Aryankpoor
        </Link>
      )}
      avatarProps={{
        src: "https://avatars.githubusercontent.com/u/64773763?s=400&u=44302421b1039d09aa788db230c5e4e3f646d234&v=4"
      }}
    />
        
      </Row>
    </Column>
  </Row>
</Section>    
    </main>
  );
}