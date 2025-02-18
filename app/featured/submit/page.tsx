"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { SEO } from "@/components/SEO"

export default function SubmitDesignPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    images: [] as string[],
    colors: [] as string[],
    sizes: [] as string[],
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // In a real app, you would upload these to a storage service
    const fileUrls = Array.from(files).map((file) => URL.createObjectURL(file))
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...fileUrls],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, you would submit to an API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Design submitted successfully!",
        description: "We'll review your submission and get back to you soon.",
      })

      router.push("/featured")
    } catch (error) {
      toast({
        title: "Error submitting design",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SEO
        title="Submit Your Design | Millimo"
        description="Share your creativity with the Millimo community. Submit your design for a chance to be featured on our platform."
        canonicalUrl="https://www.millimo.com/featured/submit"
      />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold mb-8">Submit Your Design</h1>

          <div className="rounded-lg border bg-card p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Design Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="T-Shirts">T-Shirts</SelectItem>
                    <SelectItem value="Hoodies">Hoodies</SelectItem>
                    <SelectItem value="Mugs">Mugs</SelectItem>
                    <SelectItem value="Phone Cases">Phone Cases</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="images">Upload Images</Label>
                <Input id="images" type="file" accept="image/*" multiple onChange={handleImageUpload} required />
                <p className="mt-1 text-sm text-muted-foreground">
                  Upload high-quality images of your design. Maximum 5 images.
                </p>
              </div>

              <div>
                <Label>Available Colors</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["white", "black", "navy", "red"].map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`h-8 w-8 rounded-full border-2 ${
                        formData.colors.includes(color) ? "border-primary" : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          colors: prev.colors.includes(color)
                            ? prev.colors.filter((c) => c !== color)
                            : [...prev.colors, color],
                        }))
                      }
                    />
                  ))}
                </div>
              </div>

              <div>
                <Label>Available Sizes</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["S", "M", "L", "XL"].map((size) => (
                    <Button
                      key={size}
                      type="button"
                      variant={formData.sizes.includes(size) ? "default" : "outline"}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          sizes: prev.sizes.includes(size)
                            ? prev.sizes.filter((s) => s !== size)
                            : [...prev.sizes, size],
                        }))
                      }
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Design"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

