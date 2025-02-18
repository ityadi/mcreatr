"use client"

import type React from "react"
import { HelmetProvider } from "react-helmet-async"

export const HelmetWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <HelmetProvider>{children}</HelmetProvider>
}

