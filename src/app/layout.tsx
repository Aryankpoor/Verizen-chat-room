"use client";
import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import React from "react";
import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import "./globals.css";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { usePathname } from 'next/navigation';

// Define ListItem component
const ListItem = ({
  children,
  title,
  href,
}: {
  children: React.ReactNode;
  title: string;
  href: string;
}) => (
  <li>
	<NavigationMenu.Link asChild>
	  <a
		className="block select-none rounded-[6px] px-3 py-2 text-[15px] leading-none text-violet11 no-underline outline-none transition-colors hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-violet7"
		href={href}
	  >
		<div className="text-[15px] font-medium leading-[1.2]">{title}</div>
		<p className="text-[14px] leading-[1.3] text-mauve11">{children}</p>
	  </a>
	</NavigationMenu.Link>
  </li>
);

const inter = PT_Sans({ weight: ["400", "700"], subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	const hideButtonOnPath = '/';
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={inter.className}>
					<nav className='flex justify-between items-center h-[10vh] px-8 border-b-[1px]'>
						<Link href='/' className='text-3xl font-extrabold text-blue-700'>
							WELP
						</Link>
						{pathname !== hideButtonOnPath && (
						<NavigationMenu.Root className="relative z-10 flex w-screen justify-center">
			<NavigationMenu.List className="center m-0 flex list-none rounded-md bg-white p-1 shadow-[0_2px_10px] shadow-blackA4">
			<Link href="/dashboard">
				<NavigationMenu.Item>
					<NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[15px] font-medium leading-none text-violet11 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-violet7 text-black">
					Create
						
					</NavigationMenu.Trigger>
					
				</NavigationMenu.Item></Link>

				

				<Link href="/email">
				<NavigationMenu.Item>
					<NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[15px] font-medium leading-none text-violet11 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-violet7 text-black">
					Mail
						
					</NavigationMenu.Trigger>
					
				</NavigationMenu.Item></Link>

				<NavigationMenu.Item>
					<NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[15px] font-medium leading-none text-violet11 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-violet7 text-black">
						<Link href="/history">My Invoices</Link>
						
					</NavigationMenu.Trigger>
					
				</NavigationMenu.Item>

				<Link href="/customers">
				<NavigationMenu.Item>
				<NavigationMenu.Trigger className="group text-black flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[15px] font-medium leading-none text-violet11 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-violet7">
						Customers
						</NavigationMenu.Trigger>
				</NavigationMenu.Item>
				</Link>
				

                <Link href="/settings">
				<NavigationMenu.Item>
				<NavigationMenu.Trigger className=" text-black group flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[15px] font-medium leading-none text-violet11 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-violet7">
					Settings
					</NavigationMenu.Trigger>
				</NavigationMenu.Item></Link>

				<NavigationMenu.Indicator className="top-full z-10 flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn">
					<div className="relative top-[70%] size-2.5 rotate-45 rounded-tl-sm bg-white" />
				</NavigationMenu.Indicator>
			</NavigationMenu.List>

			<div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
				<NavigationMenu.Viewport className="relative mt-2.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-md bg-white transition-[width,_height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)]" />
			</div>
		</NavigationMenu.Root>
)}
						<div className='flex items-center gap-5 name'>
						<div className="z-10 flex min-h-64 items-center justify-center">
						<Link href="https://github.com/Aryankpoor/welp/blob/master/README.md">
						 <AnimatedGradientText>
        🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}
        >
          Documentation
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