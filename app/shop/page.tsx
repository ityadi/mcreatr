"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { database } from "@/lib/database"
import { useRegion, currencySymbol, convertPrice } from "@/lib/regionContext"
import { SEO } from "@/components/SEO"
import { motion } from "framer-motion"

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const { currency } = useRegion()

  const filteredProducts = database.products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesType = typeFilter === "all" || product.type === typeFilter
    return matchesSearch && matchesCategory && matchesType
  })

  const categories = Array.from(new Set(database.products.map((product) => product.category)))

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: filteredProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.image,
        offers: {
          "@type": "Offer",
          priceCurrency: currency,
          price: convertPrice(product.price, currency),
        },
      },
    })),
  }

  return (
    <>
      <SEO
        title="Shop Custom Print-on-Demand Products | Millimo"
        description="Browse our wide selection of customizable print-on-demand products. T-shirts, hoodies, mugs, and more. Create your unique style with Millimo."
        canonicalUrl="https://www.millimo.com/shop"
        ogType="product.group"
        structuredData={structuredData}
      />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fadeIn">
        <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl drop-shadow-lg">
          Shop Our Products
        </h1>

        {/* Filters */}
        <div className="mb-8 grid gap-4 md:grid-cols-3 animate-fadeIn animation-delay-200">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="pre-designed">Pre-designed</SelectItem>
              <SelectItem value="customizable">Customizable</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group overflow-hidden rounded-lg border bg-background p-4 transition-shadow hover:shadow-lg"
            >
              <div className="aspect-square overflow-hidden rounded-lg">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
                <p className="mt-2 text-lg font-bold">
                  {currencySymbol(currency)}
                  {convertPrice(product.price, currency)}
                </p>
                <div className="mt-4 flex space-x-2">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href={`/product/${product.id}`}>View Details</Link>
                  </Button>
                  {product.type === "customizable" && (
                    <Button asChild className="flex-1">
                      <Link href={`/customize/${product.id}`}>Customize</Link>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-muted-foreground">No products found matching your criteria.</p>
        )}
      </div>
    </>
  )
}

