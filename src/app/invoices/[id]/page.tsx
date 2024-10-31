"use client";
import React, { useRef, useEffect, useCallback, useState } from "react";
import { useReactToPrint } from "react-to-print";
import InvoiceTable from "@/app/components/InvoiceTable";
import { useUser } from "@clerk/nextjs";
import { useParams, useSearchParams } from "next/navigation";

interface Props {
	id: string;
	customer: Customer;
	bankInfo: BankInfo;
	invoice: Invoice;
}

const formatDateString = (dateString: string): string => {
	const date = new Date(dateString);
	const day = date.getDate();
	const month = date.toLocaleString("default", { month: "long" });
	const year = date.getFullYear();

	return `${day} ${month}, ${year}`;
};

const Invoices = () => {
	const { isLoaded, isSignedIn, user } = useUser();
	const { id } = useParams<{ id: string }>();
	const searchParams = useSearchParams();
	const [customer, setCustomer] = useState<Customer>();
	const [bankInfo, setBankInfo] = useState<BankInfo>();
	const [invoice, setInvoice] = useState<Invoice>();
	const [disabled, setDisabled] = useState<boolean>(false);
	const name = searchParams.get("customer");
	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrintFn = useReactToPrint({ contentRef });

	async function fetchData<T>(endpoint: string): Promise<T> {
		const response = await fetch(endpoint);
		if (!response.ok) {
			throw new Error(
				`Failed to fetch from ${endpoint}: ${response.statusText}`
			);
		}
		return response.json();
	}

	const getAllInvoiceData = useCallback(async () => {
		try {
			const [customer, bankInfo, invoice] = await Promise.all([
				fetchData<any>(`/api/customers/single?name=${name}`),
				fetchData<any>(`/api/bank-info?userID=${user?.id}`),
				fetchData<any>(`/api/invoices/single?id=${id}`),
			]);
			setCustomer(customer?.customer[0]);
			setBankInfo(bankInfo?.bankInfo[0]);
			setInvoice(invoice?.invoice[0]);
		} catch (err) {
			console.error(err);
		}
	}, [id, name, user]);

	useEffect(() => {
		getAllInvoiceData();
	}, [id, name, user, getAllInvoiceData]);

	const handleSendInvoice = async () => {
		try {
			const request = await fetch("/api/invoices/send", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					invoiceID: id,
					items: invoice?.items,
					title: invoice?.title,
					amount: invoice?.total_amount,
					customerEmail: customer?.email,
					issuerName: bankInfo?.account_name,
					accountNumber: bankInfo?.account_number,
					currency: bankInfo?.currency,
				}),
			});
			const response = await request.json();
			setDisabled(false);
			alert(response.message);
		} catch (err) {
			console.error(err);
		}
	};

	if (!isLoaded || !isSignedIn) {
		return (
			<div className='w-full h-screen flex items-center justify-center'>
				<p className='text-lg'>Loading...</p>
			</div>
		);
	}

	return (
		<div className='w-full px-2 py-8'>
			<button
				className='p-3 text-blue-50 bg-blue-500 rounded-md'
				onClick={() => reactToPrintFn()}
			>
				Download
			</button>
			<button
				className='p-3 text-blue-50 bg-green-500 rounded-md'
				onClick={() => {
					setDisabled(true);
					handleSendInvoice();
				}}
				disabled={disabled}
			>
				{disabled ? "Sending..." : "Send Invoice"}
			</button>
			<div className='lg:w-2/3 w-full mx-auto shadow-md border-[1px] rounded min-h-[75vh] p-5 bg-violet-800' ref={contentRef}>
				<header className='w-full flex items-center space-x-4 justify-between'>
					<div className='w-4/5'>
						<h2 className='text-lg font-semibold mb-3'>INVOICE #0{id}</h2>
						<section className='mb-6'>
							<p className='opacity-60'>
								Issuer Name: {bankInfo?.account_name}
							</p>
							<p className='opacity-60'>
								Date: {formatDateString(invoice?.created_at!)}
							</p>
						</section>
						<h2 className='text-lg font-semibold mb-2'>TO:</h2>
						<section className='mb-6'>
							<p className='opacity-60'>Name: {customer?.name}</p>
							<p className='opacity-60'>Address: {customer?.address}</p>
							<p className='opacity-60'>Email: {customer?.email}</p>
						</section>
					</div>

					<div className='w-1/5 flex flex-col'>
						<p className='font-extrabold text-2xl'>{`${
							bankInfo?.currency
						}${Number(invoice?.total_amount).toLocaleString()}`}</p>
						<p className='text-sm opacity-60'>Total Amount</p>
					</div>
				</header>
				<div>
					<p className='opacity-60'>Subject:</p>
					<h2 className='text-lg font-semibold'>{invoice?.title}</h2>
				</div>

				<InvoiceTable
					itemList={invoice?.items ? JSON.parse(invoice.items) : []}
				/>
				{bankInfo && customer && invoice && (
					<InvoiceTable
						itemList={invoice?.items ? JSON.parse(invoice.items) : []}
					/>
				)}
			</div>
		</div>
	);
};

export default Invoices;
