"use client"

import type React from "react"
import { useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"

interface PageLayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  const pathname = usePathname()

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  useEffect(() => {
    scrollToTop()
    // Save current page to localStorage for navigation history
    localStorage.setItem("lastVisitedPage", pathname)
  }, [pathname, scrollToTop])

  // Handle back/forward browser navigation
  useEffect(() => {
    const handlePopState = () => {
      const lastPage = localStorage.getItem("lastVisitedPage")
      if (lastPage && lastPage !== pathname) {
        scrollToTop()
      }
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [pathname, scrollToTop])

  return <div className="min-h-screen flex flex-col">{children}</div>
}

