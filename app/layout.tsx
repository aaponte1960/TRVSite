import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"

import "./globals.css"

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
})

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Dr. Alfonso Aponte",
  description:
    "Official website for Dr. Alfonso Aponte with contact details, profile, and digital presence in Puerto Rico.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#07104e",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-background font-sans text-foreground antialiased">{children}</body>
    </html>
  )
}
