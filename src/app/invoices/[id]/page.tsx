"use client";
import React, { useRef, useEffect, useCallback, useState } from "react";
import { useReactToPrint } from "react-to-print";
import InvoiceTable from "@/app/components/InvoiceTable";
import { useUser } from "@clerk/nextjs";
import { useParams, useSearchParams } from "next/navigation";
import styled from 'styled-components';

const formatDateString = (dateString: string): string => {
	const date = new Date(dateString);
	const day = date.getDate();
	const month = date.toLocaleString("default", { month: "long" });
	const year = date.getFullYear();

	return `${day} ${month}, ${year}`;
};

const StyledWrapper = styled.div`

  .cssbuttons-io-button {
    display: flex;
    align-items: center;
    font-family: inherit;
    font-weight: 500;
    font-size: 17px;
    padding: 0.8em 1.5em 0.8em 1.2em;
    color: white;
    background: #ff7d00;
    background: linear-gradient(0deg, rgba(255, 125, 0, 1) 0%, rgba(255, 95, 109, 1) 100%);
    border: 2px solid #ff7d00;
    border-radius: 20em;
  }

  .cssbuttons-io-button svg {
    margin-right: 8px;
  }

  .cssbuttons-io-button:hover {
    border-color: white;
    box-shadow: 0 0.5em 1.5em -0.5em #bf5800;
  }

  .cssbuttons-io-button:active {
    box-shadow: 0 0.3em 1em -0.5em #bf5800;
  }

  button {
    font-family: inherit;
    font-size: 18px;
    background: linear-gradient(to bottom, #4dc7d9 0%,#66a6ff 100%);
    color: white;
    padding: 0.8em 1.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 25px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s;
  }

  button:hover {
    transform: translateY(-3px);
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  }

  button:active {
    transform: scale(0.95);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  }

  button span {
    display: block;
    margin-left: 0.4em;
    transition: all 0.3s;
  }

  button svg {
    width: 18px;
    height: 18px;
    fill: white;
    transition: all 0.3s;
  }

  button .svg-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    margin-right: 0.5em;
    transition: all 0.3s;
  }

  button:hover .svg-wrapper {
    background-color: rgba(255, 255, 255, 0.5);
  }

  button:hover svg {
    transform: rotate(45deg);
  }`;


const Invoices = () => {
	const { isLoaded, isSignedIn, user } = useUser();
	const { id } = useParams<{ id: string }>();
	const searchParams = useSearchParams();
	const [customer, setCustomer] = useState<Customer | undefined>();
	const [bankInfo, setBankInfo] = useState<BankInfo | undefined>();
	const [invoice, setInvoice] = useState<Invoice | undefined>();
	const [disabled, setDisabled] = useState<boolean>(false);
	const name = searchParams.get("customer") as string;
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
			const [customerData, bankInfoData, invoiceData] = await Promise.all([
				fetchData<any>(`/api/customers/single?name=${name}`),
				fetchData<any>(`/api/bank-info?userID=${user?.id}`),
				fetchData<any>(`/api/invoices/single?id=${id}`),
			]);
			setCustomer(customerData?.customer[0]);
			setBankInfo(bankInfoData?.bankInfo[0]);
			setInvoice(invoiceData?.invoice[0]);
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
					customerAddress: customer?.address,
					customerName: customer?.name,
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
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<div className='w-full px-2 py-8'>
			<StyledWrapper>
			<button
				className='cssbuttons-io-button'
				onClick={() => reactToPrintFn()}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20}>
          <path fill="none" d="M0 0h24v24H0z" />
          <path fill="currentColor" d="M1 14.5a6.496 6.496 0 0 1 3.064-5.519 8.001 8.001 0 0 1 15.872 0 6.5 6.5 0 0 1-2.936 12L7 21c-3.356-.274-6-3.078-6-6.5zm15.848 4.487a4.5 4.5 0 0 0 2.03-8.309l-.807-.503-.12-.942a6.001 6.001 0 0 0-11.903 0l-.12.942-.805.503a4.5 4.5 0 0 0 2.029 8.309l.173.013h9.35l.173-.013zM13 12h3l-4 5-4-5h3V8h2v4z" />
        </svg>
				Download
			</button>
			</StyledWrapper>
			
			<StyledWrapper>
			<button
				className='p-3 text-blue-50 bg-green-500 rounded-md'
				onClick={() => {
					setDisabled(true);
					handleSendInvoice();
				}}
				disabled={disabled}
			><div className="svg-wrapper-1">
			<div className="svg-wrapper">
			  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
				<path fill="none" d="M0 0h24v24H0z" />
				<path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" />
			  </svg>
			</div>
		  </div>
				{disabled ? "Sending..." : "Send Invoice"}
			</button>
			</StyledWrapper>
			<div className='lg:w-2/3 w-full mx-auto shadow-md border-[1px] rounded min-h-[75vh] p-5 bg-violet-800' ref={contentRef}>
				<header className='w-full flex items-center space-x-4 justify-between'>
					<div className='w-4/5'>
						<h2 className='text-lg font-semibold mb-3'>INVOICE #{id}</h2>
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

				{invoice?.items && (
					<InvoiceTable itemList={JSON.parse(invoice.items)} />
				)}
			</div>
		</div>
	);
};

export default Invoices;
