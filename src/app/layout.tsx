import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import "./globals.css";
import { neobrutalism } from '@clerk/themes'

const inter = PT_Sans({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Welp - Create Beautiful Invoices",
	description: "Time to bill your customers",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider appearance={{
			baseTheme: neobrutalism,
		  }}>
			<html lang='en'>
				<body className={inter.className}>
					<nav className='flex justify-between items-center h-[10vh] px-8 border-b-[1px]'>
						<Link href='/' className='text-xl font-extrabold text-blue-700'>
							WELP
						</Link>
						<div className='flex items-center gap-5 name'>
							{/*-- if user is signed out --*/}
							<SignedOut>
								<SignInButton mode='modal' />
							</SignedOut>
							{/*-- if user is signed in --*/}
							<SignedIn>
								<Link href='/dashboard' className=''>
									Dashboard
								</Link>
								<UserButton/>
							</SignedIn>
						</div>
					</nav>
					<br />
					<br />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}