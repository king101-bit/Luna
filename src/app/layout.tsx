import type { Metadata } from "next"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
export const metadata: Metadata = {
  title: "Luna",
  description:
    "Learn to code through interactive lessons, real-world projects, and expert mentorship.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
