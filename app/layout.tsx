import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { AppProvider } from "@/lib/context"
import { RegionProvider } from "@/lib/regionContext"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
// import PageLayout from "@/components/PageLayout" //Removed as per instructions
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "mCreatr - Print Anything, Anywhere",
    template: "%s | mCreatr",
  },
  description:
    "Custom print-on-demand products with premium quality. Create and sell your unique designs with mCreatr.",
  keywords: ["print-on-demand", "custom design", "personalized products", "merchandise", "custom printing"],
  authors: [{ name: "mCreatr Team" }],
  openGraph: {
    title: "mCreatr - Print Anything, Anywhere",
    description: "Custom print-on-demand products with premium quality",
    url: "https://www.mcreatr.com",
    siteName: "mCreatr",
    images: [
      {
        url: "https://www.mcreatr.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "mCreatr - Print Anything, Anywhere",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mCreatr - Print Anything, Anywhere",
    description: "Custom print-on-demand products with premium quality",
    images: ["https://www.mcreatr.com/twitter-image.jpg"],
  },
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} flex flex-col min-h-screen bg-background text-foreground antialiased`}>
        <ThemeProvider>
          <RegionProvider>
            <AppProvider>
              <Header />
              {children}
              <Footer />
            </AppProvider>
          </RegionProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}



import './globals.css'