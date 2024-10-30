import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
      <main className="flex flex-row gap-8 row-start-2 items-center sm:items-start">
        <Link href="/csr">
          <button className="bg-blue-500 text-white font-bold py-4 px-6 rounded hover:bg-blue-600 transition duration-200">
            Go to CSR Page
          </button>
        </Link>
        <Link href="/ssg">
          <button className="bg-blue-500 text-white font-bold py-4 px-6 rounded hover:bg-blue-600 transition duration-200">
            Go to SSG Page
          </button>
        </Link>
        <Link href="/ssr">
          <button className="bg-blue-500 text-white font-bold py-4 px-6 rounded hover:bg-blue-600 transition duration-200">
            Go to SSR Page
          </button>
        </Link>
      </main>
    </div>
  );
}
