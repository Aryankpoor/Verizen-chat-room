import Link from "next/link";

export default function Home() {
  return (
    <main className='w-full'>
      <section className='p-8 h-[90vh] md:w-2/3 mx-auto text-center w-full flex flex-col items-center justify-center'>
        <h2 className='text-3xl font-bold mb-4 md:text-4xl'>
          Create dynamic invoices with Welp
        </h2>
        <p className='opacity-70 mb-4 text-sm md:text-base leading-loose'>
          Welp is an open source invoicing software that helps you craft professional invoices for your customers for free!
        </p>
        <Link
          href='/dashboard'
          className='rounded w-[200px] px-2 py-3 bg-blue-500 text-gray-50'
        >
          LOG IN
        </Link>
      </section>
    </main>
  );
}