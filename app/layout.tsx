"use client";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { NavigationBar } from "@/components/NavigationBar/NavigationBar";
import { AuthProvider } from "@/providers/Auth/AuthProvider";
const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en" className={nunito.className}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <body>
            <div className="min-h-screen bg-gray-50">
              <NavigationBar />
              <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
              </main>
              <Toaster />
            </div>
          </body>
        </AuthProvider>
      </QueryClientProvider>
    </html>
  );
}
