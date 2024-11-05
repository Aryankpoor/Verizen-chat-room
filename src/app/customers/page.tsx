"use client";
import CustomersTable from "../components/CustomersTable";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import SideNav from "@/app/components/SideNav";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"

export default function Customers() {
	const { isLoaded, isSignedIn, user } = useUser();
	const [customerName, setCustomerName] = useState<string>("");
	const [customerEmail, setCustomerEmail] = useState<string>("");
	const [customerAddress, setCustomerAddress] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [customers, setCustomers] = useState([]);

	const fetchCustomers = useCallback(async () => {
		try {
			const res = await fetch(`/api/customers?userID=${user?.id}`);
			const data = await res.json();
			setCustomers(data.customers);
		} catch (err) {
			console.log(err);
		}
	}, [user]);

	useEffect(() => {
		if (user) {
			fetchCustomers();
		}
	}, [fetchCustomers, user]);

	const createCustomer = async () => {
		setLoading(true);
		try {
			const request = await fetch("/api/customers", {
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
			});
			const response = await request.json();
			console.log(response.message);
			setCustomerAddress("");
			setCustomerEmail("");
			setCustomerName("");
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	const handleAddCustomer = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		createCustomer();
	};

	if (!isLoaded || !isSignedIn) {
		return <p>Loading...</p>;
	}

	return (
		<div className='w-full'>
			<main className='min-h-[90vh] flex items-start'>
				<SideNav/>

				<div className='md:w-5/6 w-full h-full p-6'>
					<h2 className='text-2xl font-bold'>Customers</h2>
					<p className='opacity-70 mb-4'>Create and view all your customers</p>

					<form className='w-full' onSubmit={handleAddCustomer} method='POST'>
						<div className='w-full flex items-center space-x-4  mb-3'>
							<section className='w-1/2'>
								<Label className=''>Customer&apos;s Name</Label>
								<Input
									type='text'
									className='w-full p-2 border border-gray-200 rounded-sm text-white'
									value={customerName}
									placeholder="Enter customer name"
									required
									onChange={(e) => setCustomerName(e.target.value)}
								/>
							</section>

							<section className='w-1/2'>
								<Label className=''>Email Address</Label>
								<Input
									type='email'
									className='w-full p-2 border border-gray-200 rounded-sm text-white'
									value={customerEmail}
									placeholder="Enter email address of customer"
									onChange={(e) => setCustomerEmail(e.target.value)}
									required
								/>
							</section>
						</div>
						<Label htmlFor='address'>Billing Address</Label>
						<Textarea
							name='address'
							id='address'
							rows={3}
							className='w-full p-2 border border-gray-200 rounded-sm text-white'
							value={customerAddress}
							onChange={(e) => setCustomerAddress(e.target.value)}
							placeholder="Enter customer's billing address"
							required
						/>
						<br />

						<button
							className='bg-blue-500 text-white p-2 rounded-md mb-6'
							disabled={loading}
						>
							{loading ? "Adding..." : "Add Customer"}
						</button>
					</form>

					<CustomersTable customers={customers} />
				</div>
			</main>
		</div>
	);
}