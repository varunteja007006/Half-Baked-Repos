import "./globals.css";

import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";

import { AuthProvider } from "@/components/features/auth";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import { ConvexClientProvider } from "@/lib/providers/convex-provider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

import AdminPanelLayout from "@/components/features/admin-panel/admin-panel-layout";

import { BRAND_DESCRIPTION, BRAND_NAME } from "@/lib/config/brand";

import { Toaster } from "@/components/ui/sonner";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: BRAND_NAME,
  description: BRAND_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" suppressHydrationWarning>
        <meta name="apple-mobile-web-app-title" content="Fleetio" />
        <body className={`${geistMono.variable} antialiased min-h-screen scroll-smooth`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConvexClientProvider>
              <AuthProvider>
                <AdminPanelLayout>{children}</AdminPanelLayout>
              </AuthProvider>
            </ConvexClientProvider>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
