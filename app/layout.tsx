import type { Metadata } from "next"

import "./globals.css"

export const metadata: Metadata = {
  title: "Dr. Alfonso Aponte",
  description:
    "Official website for Dr. Alfonso Aponte with contact details, profile, and digital presence in Bayamon, Puerto Rico.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-background font-sans text-foreground antialiased">{children}</body>
    </html>
  )
}
