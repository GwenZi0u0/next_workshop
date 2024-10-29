import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

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
        <header className="h-16 flex pl-4 fixed top-0 left-0 w-full" style={{ backgroundColor: "#F08080" }}>
          <Link href="/" className="flex items-center">
            <span className="ml-2 text-2xl font-bold">Pokédex</span>
          </Link>
        </header>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}