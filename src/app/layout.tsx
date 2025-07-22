// src/app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "./providers"
import { ReactQueryProvider } from "@/components/QueryProvider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: {
    default: "Luna",
    template: "%s - Luna",
  },
  description:
    "Learn to code through interactive lessons, real-world projects, and expert mentorship.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <ReactQueryProvider>
          <ThemeProvider>
            {children}
            <Analytics />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
