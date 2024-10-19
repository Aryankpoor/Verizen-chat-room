import CustomersTable from "../components/CustomersTable";
import { useCallback, useEffect, useState } from "react";
import SideNav from "@/app/components/SideNav";

export default function Customers() {
  const [customerName, setCustomerName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerAddress, setCustomerAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState([]);

  const handleAddCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 👉🏻 createCustomer();
  };

  return (
    <div className='w-full'>
      <main className='min-h-[90vh] flex items-start'>
        <SideNav />
        <div className='md:w-5/6 w-full h-full p-6'>
          <h2 className='text-2xl font-bold'>Customers</h2>
          <p className='opacity-70 mb-4'>Create and view all your customers</p>

          <form className='w-full' onSubmit={handleAddCustomer} method='POST'>
            <div className='w-full flex items-center space-x-4 mb-3'>
              <section className='w-1/2'>
                <label>Customer&apos;s Name</label>
                <input
                  type='text'
                  className='w-full p-2 border border-gray-200 rounded-sm'
                  value={customerName}
                  required
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </section>

              <section className='w-1/2'>
                <label>Email Address</label>
                <input
                  type='email'
                  className='w-full p-2 border border-gray-200 rounded-sm'
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                />
              </section>
            </div>
            <label htmlFor='address'>Billing Address</label>
            <textarea
              name='address'
              id='address'
              rows={3}
              className='w-full p-2 border border-gray-200 rounded-sm'
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              required
            />
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