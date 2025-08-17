"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname()
  const [forcedTheme, setForcedTheme] = useState<"light" | undefined>(undefined)

  useEffect(() => {
    if (pathname === "/") {
      setForcedTheme("light")
    } else {
      setForcedTheme(undefined)
    }
  }, [pathname])

  return (
    <NextThemesProvider
      forcedTheme={forcedTheme}
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
