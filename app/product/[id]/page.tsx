"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { database, getRegionalPrice } from "@/lib/database"
import { useApp } from "@/lib/context"
import { useRegion, currencySymbol } from "@/lib/regionContext"
import { SEO } from "@/components/SEO"
import { LiveStats } from "@/components/LiveStats"
import { PhoneIcon as WhatsApp } from "lucide-react"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { dispatch } = useApp()
  const { region, currency } = useRegion()
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")

  const product =
    database.products.find((p) => p.id === params.id) || database.featuredDesigns.find((p) => p.id === params.id)

  if (!product) {
    return <div>Product not found</div>
  }

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      })
      return
    }

    if (product.colors && !selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      })
      return
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: `${product.id}-${Date.now()}`,
        productId: product.id,
        customization: {
          color: selectedColor,
          size: selectedSize,
        },
      },
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.id,
    mpn: product.id,
    brand: {
      "@type": "Brand",
      name: "Millimo",
    },
    offers: {
      "@type": "Offer",
      url: `https://www.millimo.com/product/${product.id}`,
      priceCurrency: currency,
      price: getRegionalPrice(product.price, currency),
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
    },
  }

  return (
    <>
      <SEO
        title={`${product.name} | Millimo Custom Print-on-Demand`}
        description={product.description}
        canonicalUrl={`https://www.millimo.com/product/${product.id}`}
        ogType="product"
        ogImage={product.image}
        structuredData={structuredData}
      />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fadeIn">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            {product.designer && <p className="text-lg text-muted-foreground">By {product.designer}</p>}
            <p className="mt-4 text-lg text-muted-foreground">{product.description}</p>
            <LiveStats
              initialViewers={Math.floor(Math.random() * 50)}
              initialCustomized={Math.floor(Math.random() * 100)}
            />
            <p className="mt-4 text-2xl font-bold">
              {currencySymbol(currency)}
              {getRegionalPrice(product.price, currency)}
            </p>

            <div className="mt-8 space-y-4">
              {product.colors && (
                <div>
                  <label className="mb-2 block text-sm font-medium">Color</label>
                  <div className="flex space-x-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`h-8 w-8 rounded-full border-2 ${
                          selectedColor === color ? "border-primary" : "border-transparent"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {product.sizes && (
                <div>
                  <label className="mb-2 block text-sm font-medium">Size</label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex space-x-4">
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                {product.type === "customizable" && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1"
                    onClick={() => router.push(`/customize/${product.id}`)}
                  >
                    Customize
                  </Button>
                )}
              </div>

              <Button
                size="lg"
                className="w-full mt-4 flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <a
                  href={`https://wa.me/917488532440?text=Hi,%20I'm%20interested%20in%20bulk%20orders%20for%20${encodeURIComponent(
                    product.name,
                  )}.%20Can%20you%20provide%20more%20information?`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsApp className="mr-2 h-5 w-5" />
                  Contact for Business
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

