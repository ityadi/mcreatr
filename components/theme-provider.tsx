"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  React.useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add("dark")
  }, [])

  return (
    <NextThemesProvider {...props} forcedTheme="dark" enableSystem={false} attribute="class">
      {children}
    </NextThemesProvider>
  )
}

