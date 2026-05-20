import type { Metadata } from "next";
import { Urbanist, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-urbanist",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JVA — Work less. Scale more.",
  description:
    "AI workflows and automation tools built for small business owners who are done doing everything manually.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${urbanist.variable} ${dmSans.variable}`}>
      <body className="min-h-full antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
