"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRegion, currencySymbol, convertPrice } from "@/lib/regionContext"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
}

interface ImageFrameProps {
  products: Product[]
}

export function ImageFrame({ products }: ImageFrameProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { currency } = useRegion()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [products.length])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
  }

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg group">
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="mb-2">{product.description}</p>
              <p className="text-lg font-bold mb-2">
                {currencySymbol(currency)}
                {convertPrice(product.price, currency)}
              </p>
              <div className="flex space-x-2">
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/product/${product.id}`}>View Details</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={`/customize/${product.id}`}>Customize</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}

