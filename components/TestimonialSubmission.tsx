"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export function TestimonialSubmission() {
  const [name, setName] = useState("")
  const [review, setReview] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this to your backend
    console.log("Testimonial submitted:", { name, review })
    toast({
      title: "Thank you for your review!",
      description: "Your testimonial has been submitted for moderation.",
    })
    setName("")
    setReview("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white-700">
          Your Name
        </label>
        <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="review" className="block text-sm font-medium text-white-700">
          Your Review
        </label>
        <Textarea id="review" value={review} onChange={(e) => setReview(e.target.value)} required />
      </div>
      <Button type="submit">Submit Testimonial</Button>
    </form>
  )
}

