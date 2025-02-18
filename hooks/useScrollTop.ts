"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import type React from "react"
import type { MouseEvent } from "react"

export const useScrollTop = () => {
  const router = useRouter()

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault()
      const href = e.currentTarget.href
      const targetPath = href.replace(window.location.origin, "")

      if (targetPath === window.location.pathname) {
        scrollToTop()
      } else {
        router.push(targetPath)
        scrollToTop()
      }
    },
    [router, scrollToTop],
  )

  return handleClick
}

