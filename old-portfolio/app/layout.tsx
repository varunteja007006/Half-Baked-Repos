import * as React from "react";

import type { Metadata } from "next";
import { Comic_Neue } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

import Navbar from "./_components/nav/Navbar";
import Footer from "./_components/footer/Footer";
import { Toaster } from "@/components/ui/toaster";
import ProgressScroll from "./react-projects/progress-on-scroll/page";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const comicNeue = Comic_Neue({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Varun Teja",
  description: "varunteja007006@gmail.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${comicNeue.className} antialiased scroll-smooth min-w-[300px] bg-blue-50  dark:bg-gradient-to-tl dark:from-purple-950 from-5% dark:via-black dark:via-90% dark:to-purple-950
        transition-colors delay-100 duration-100`}
      >
        <Providers>
          <React.Fragment>
            <ProgressScroll
              divStyles="hidden"
              progressStyles="dark:bg-purple-800 bg-blue-300 h-1.5"
            />
            <Navbar />
            <main className="min-h-[100vh] w-full">{children}</main>
            <Footer />
          </React.Fragment>
          <Toaster />
          <SonnerToaster />
        </Providers>
      </body>
    </html>
  );
}
