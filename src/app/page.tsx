import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Send, PieChart, Github, Star, Code, Lock, Zap } from "lucide-react"
import Link from "next/link"
import { getDBVersion } from "./db";
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import BlurIn from "@/components/ui/blur-in";
import HyperText from "@/components/ui/hyper-text"
import { Analytics } from '@vercel/analytics/react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Hero Section */}
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-8">
            <div className="flex justify-between items-center w-full max-w-[200px] gap-2">
              <Avatar className="w-14 h-14">
                <AvatarImage src="https://cloud-hgwoeujwy-hack-club-bot.vercel.app/0invoice.png" alt="Logo" />
                <AvatarFallback className="text-2xl">WP</AvatarFallback>
              </Avatar>
              <BlurIn className="text-xl text-gray-400" word="Welp" />
            </div>
          </div>

          <BlurIn 
            className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4"
            word="Free and Open Source Invoice Management Platform" 
          />
          <br />
          <br />
          <div className="flex justify-center mt-8">
            <Button 
              asChild 
              size="lg" 
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-lg font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <Link href="/dashboard" className="relative px-8 py-4 transition-all ease-in duration-75 bg-black rounded-md group-hover:bg-opacity-0 text-xl">
                Get Started
              </Link>
            </Button>
          </div>
        </div>

        {/* Open Source Section */}
        <div className="mb-16">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center">
                <Code className="text-4xl mr-2" />
                <BlurIn word="Open Source & Free Forever" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl text-gray-300 mb-4">
                Welp is open source and free to use. We believe in the power of community-driven development and transparency.
              </p>
              <ul className="text-2xl list-disc list-inside text-gray-300 space-y-2">
                <li>Fully open source codebase</li>
                <li>MIT License</li>
                <li>Community contributions welcome</li>
                <li>No hidden costs or premium features</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-5xl scroll-m-20 border-b border-gray-800 pb-2 text-4xl font-semibold tracking-tight text-white first:mt-0 mb-8">
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center text-white">
                  <FileText className="mr-2" />
                  Invoice Generation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl leading-7 text-gray-300">
                  Create dynamic invoices with built in customer management.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center text-white">
                  <PieChart className="mr-2" />
                  Financial Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl leading-7 text-gray-300">
                  Keep your payments in check with our soon to-be available invoice payments management feature.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center text-white">
                  <Send className="mr-2" />
                  Easy Sending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl leading-7 text-gray-300">
                  Send invoices directly to clients via email or generate shareable links with a single click.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center text-white">
                  <Lock className="mr-2" />
                  Secure Storage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl leading-7 text-gray-300">
                  All your invoices are safely stored on our Neon database.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upcoming Features Section */}
        <div className="mb-16">
          <h2 className="text-6xl scroll-m-20 border-b border-gray-800 pb-2 text-3xl font-semibold tracking-tight text-white first:mt-0 mb-8">
            Coming Soon
          </h2>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <ul className="text-2xl list-disc list-inside text-gray-300 space-y-2">
                <li>Stripe Payments Intent</li>
                <li>Integration with other popular payment gateways</li>
                <li>Built-in Email Client</li>
                <li>Invoice Status Management</li>
                <li>Client portal for easier collaboration</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sample Invoice Tables */}
        <div className="mb-16">
          <HyperText 
            text="INVOICE MANAGEMENT HAS NEVER BEEN THIS EASY" 
            className="text-4xl scroll-m-20 border-b border-gray-800 pb-2 text-3xl font-semibold tracking-tight text-white first:mt-0 mb-8" 
          />
          <Card className="text-xl bg-gray-900 border-gray-800">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-300 text-3xl">Invoice #</TableHead>
                    <TableHead className="text-gray-300 text-3xl">Client</TableHead>
                    <TableHead className="text-gray-300 text-3xl">Amount</TableHead>
                    <TableHead className="text-gray-300 text-3xl">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-gray-300 text-xl">INV-001</TableCell>
                    <TableCell className="text-gray-300 text-xl">Acme Corp</TableCell>
                    <TableCell className="text-gray-300 text-xl">$1,000.00</TableCell>
                    <TableCell><Badge className="bg-green-500 hover:bg-green-600 text-xl">Paid</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-gray-300 text-xl">INV-002</TableCell>
                    <TableCell className="text-xl text-gray-300">Globex Inc</TableCell>
                    <TableCell className="text-xl text-gray-300">$750.00</TableCell>
                    <TableCell><Badge className="text-xl bg-yellow-500 hover:bg-yellow-600">Pending</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xl text-gray-300">INV-003</TableCell>
                    <TableCell className="text-xl text-gray-300">Initech LLC</TableCell>
                    <TableCell className="text-xl text-gray-300">$500.00</TableCell>
                    <TableCell><Badge className="text-xl" variant="destructive">Overdue</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xl text-gray-300">INV-004</TableCell>
                    <TableCell className="text-xl text-gray-300">Umbrella Corp</TableCell>
                    <TableCell className="text-xl text-gray-300">$2,500.00</TableCell>
                    <TableCell><Badge className="text-xl bg-green-500 hover:bg-green-600">Paid</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xl text-gray-300">INV-005</TableCell>
                    <TableCell className="text-xl text-gray-300">Stark Industries</TableCell>
                    <TableCell className="text-xl text-gray-300">$3,750.00</TableCell>
                    <TableCell><Badge className="text-xl bg-yellow-500 hover:bg-yellow-600">Pending</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="scroll-m-20 border-b border-gray-800 pb-2 text-3xl font-semibold tracking-tight text-white first:mt-0 mb-8">
            Technologies Used
          </h2>
          <Tabs defaultValue="testimonial1" className="w-full">
            <TabsList className="grid w-full text-2xl grid-cols-3">
              <TabsTrigger value="testimonial1">Frontend</TabsTrigger>
              <TabsTrigger value="testimonial2">Backend</TabsTrigger>
              <TabsTrigger value="testimonial3">Upcoming</TabsTrigger>
            </TabsList>
            <TabsContent value="testimonial1">
              <Card className="bg-gray-900 border-gray-800 text-xl">
                <CardHeader>
                  <CardTitle className="text-white">Next.js</CardTitle>
                  <p className="leading-7 text-gray-300">
                    Fun fact: Some of the original components in Welp were built using Angular.JS
                  </p>
                  <CardTitle className="text-white">Shadcn</CardTitle>
                  <p className="leading-7 text-gray-300">
                    Welp uses the <Link href="https://ui.shadcn.com/" className="text-[#faee1c]">shadcn UI</Link> component library for, well.... basically everything!
                  </p>
                  <CardTitle className="text-white">MagicUI</CardTitle>
                  <p className="leading-7 text-gray-300">
                    What makes Welp special is that it's UI is built on both Shadcn and <Link className="text-[#faee1c]" href="https://magicui.design/">MagicUI</Link>, two different component libraries. Ironically, MagicUI is built on Shadcn.
                  </p>
                  <CardTitle className="text-white">Typescript</CardTitle>
                  <p className="leading-7 text-gray-300">
                    Welp is written in Typescript, thus making integration with UI component libraries easier.
                  </p>
                  <CardTitle className="text-white">TailwindCSS</CardTitle>
                  <p className="leading-7 text-gray-300">
                    TailwindCSS has been used by Welp to create inline classes, providing you with the Beautiful UI before your eyes.
                  </p>
                </CardHeader>
                <CardContent>
                  
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="testimonial2">
              <Card className="bg-gray-900 border-gray-800 text-xl">
                <CardHeader>
                  <CardTitle className="text-white">Neon</CardTitle>
                   <p className="leading-7 text-gray-300">
                    Welp is built on Postgres used by <Link href="https://neon.tech/" className="text-[#faee1c]">Neon</Link> to store all the invoices and customer data.
                  </p>
                  <CardTitle className="text-white">Clerk</CardTitle>
                   <p className="leading-7 text-gray-300">
                    All users are stored on <Link href="https://clerk.com/" className="text-[#faee1c]">Clerk</Link> which provides easy account management system for users within Welp.
                  </p>
                  <CardTitle className="text-white">Resend</CardTitle>
                   <p className="leading-7 text-gray-300">
                   Welp uses React <Link href="https://resend.com/emails" className="text-[#faee1c]">Resend</Link> which enables users to send invoices to customers directly from Welp
                  </p>
                </CardHeader>
                <CardContent>
                 
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="testimonial3">
              <Card className="bg-gray-900 border-gray-800 text-xl">
                <CardHeader>
                  <CardTitle className="text-white">Google Cloud Console</CardTitle>
                 <p className="leading-7 text-gray-300">
                    Our upcoming email client within Welp will use Google Cloud Console.
                  </p>
                  <CardTitle className="text-white">Firebase</CardTitle>
                 <p className="leading-7 text-gray-300">
                    We are currently working on Extractor, a feature which would allow users to extract data from receipts.
                  </p>
                  <CardTitle className="text-white">Ngrok</CardTitle>
                 <p className="leading-7 text-gray-300">
                    Oh what we use it for? That's a secret.
                  </p>
                </CardHeader>
                <CardContent>
                  
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* CTA Section */}
        <div className="mb-16">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-4xl text-white">Still not sure about Welp?</CardTitle>
            </CardHeader>
            <CardContent>
               <p className="leading-7 text-2xl text-gray-300">
                     Wow, you are a tough cookie. Maybe a nice email will convince ya. Don't worry, you are not subscribing to any newsletters!
                  </p>
                  <br />
              <form className="flex gap-4" action="https://www.formbackend.com/f/8d06fec7a49034ca" method="POST" >
                <div className="flex-grow">
                  <Label htmlFor="email" className="sr-only text-xl">Email</Label>
                  <Input id="email" placeholder="Enter your email" type="email" className="text-xl bg-gray-800 text-white border-gray-700" name="user-email"/>
                </div>
              
                <Button type="submit" className="text-xl bg-gray-400">Go!</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center text-sm text-gray-300">
              <Avatar className="text-2xl mr-4">
                <AvatarImage src="https://avatars.githubusercontent.com/u/64773763?s=400&u=44302421b1039d09aa788db230c5e4e3f646d234&v=4" alt="Aryan Kapoor" />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
              <p><Link href="https://www.aryankap.com">Aryan Kapoor</Link></p>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <Card className="bg-gray-800 border-gray-700 w-full md:w-auto max-w-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">Aryankpoor/welp</h3>
                    <Link href="https://github.com/Aryankpoor/welp">
                    <Button variant="outline" size="sm" className="text-md bg-white text-black hover:bg-gray-200">
                      <Star className="text-lg mr-2 h-5 w-5" />
                      Star
                    </Button></Link>
                  </div>
                  <p className="text-md text-gray-400 mb-2 break-words">All-in-one platform to create and Manage dynamic invoices</p>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                        <span>TypeScript</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4" />
                        <span>0</span>
                      </div>
                    </div>
                    <span>Updated November 2024</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <Analytics />
      </footer>
    </div>
  )
}