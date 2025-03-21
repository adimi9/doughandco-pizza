'use client'; 

// set font 
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SessionProvider } from "next-auth/react";
import { AppProvider } from "@/components/AppContext";

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700']})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <main 
          className="flex-1 max-w-7xl mx-auto p-4">
            <AppProvider>
              <SessionProvider>
                <Header />
                  {children}
                <Footer />
              </SessionProvider>
            </AppProvider>
        </main>
      </body>
    </html>
  );
}
