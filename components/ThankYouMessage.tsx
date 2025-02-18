"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function ThankYouMessage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/#testimonials")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4">Thank You for Your Order!</h2>
        <p className="mb-4">Your order has been successfully sent via WhatsApp.</p>
        <p>You'll be redirected to the homepage in a few seconds...</p>
      </div>
    </div>
  )
}

