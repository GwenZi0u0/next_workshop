import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="antialiased">
        <header
          className="h-16 flex pl-4 fixed top-0 left-0 w-full"
          style={{ backgroundColor: "#F08080" }}
        >
          <div className="relative group">
            <Link href="/" className="flex items-center h-full">
              <span className="ml-2 text-2xl font-bold flex items-center">
                Pokédex
              </span>
            </Link>
            <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg rounded mt-0 h-auto w-60">
              <Link
                href="/csr"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                CSR Page
              </Link>
              <Link
                href="/ssr"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                SSR Page
              </Link>
              <Link
                href="/ssg"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                SSG Page
              </Link>
            </div>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
