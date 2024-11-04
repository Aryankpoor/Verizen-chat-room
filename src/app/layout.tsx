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
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";

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
						<div className="z-10 flex min-h-64 items-center justify-center">
						<Link href="https://github.com/Aryankpoor/welp">
						 <AnimatedGradientText>
        🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}
        >
          Github Repository
        </span>
        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedGradientText>
	  </Link>
    </div>
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