import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "jotai";
import QueryProvider from "./QueryProvider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Staylio",
  description: "",
  icons: {
    icon: "/house.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full max-w-[96rem] overflow-x-hidden mx-auto bg-white`}
      >
        <Provider>
          <QueryProvider>
            <Navbar />
            <div className="min-h-screen p-4 md:p-6">{children}</div>
            <Footer />
            <Toaster />
          </QueryProvider>
        </Provider>
      </body>
    </html>
  );
}
