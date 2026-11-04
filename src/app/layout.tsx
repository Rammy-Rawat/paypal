import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PayMind — AI Financial Protection & Digital Delivery Assurance",
  description:
    "AI-powered international payment intelligence, PayPal sandbox verification, and digital deliverable assurance for global freelancers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} bg-slate-950 text-slate-100 min-h-screen antialiased flex`}>
        {/* Navigation Sidebar wrapped in Suspense for Next.js 16 partial prerendering */}
        <Suspense fallback={<aside className="w-64 bg-slate-950 border-r border-slate-850 h-screen sticky top-0" />}>
          <Sidebar />
        </Suspense>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Suspense fallback={<header className="h-14 border-b border-slate-800 bg-slate-950/90" />}>
            <Header />
          </Suspense>
          <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
