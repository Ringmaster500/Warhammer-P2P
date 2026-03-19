import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "War-Rent | Warhammer Army Rental Marketplace",
  description:
    "Rent beautifully painted Warhammer 40K armies from verified collectors. Try before you buy, or earn passive income from your painted collection.",
  keywords: ["warhammer", "rental", "miniatures", "40k", "age of sigmar", "tabletop"],
  openGraph: {
    title: "War-Rent | Warhammer Army Rental Marketplace",
    description: "Rent beautifully painted Warhammer 40K armies from verified collectors.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
