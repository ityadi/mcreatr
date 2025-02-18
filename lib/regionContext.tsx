"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Region = "nepal" | "india" | "rest"
type Currency = "NPR" | "INR" | "USD"

interface RegionContextType {
  region: Region
  currency: Currency
  setRegion: (region: Region) => void
}

const RegionContext = createContext<RegionContextType | undefined>(undefined)

export const useRegion = () => {
  const context = useContext(RegionContext)
  if (!context) {
    throw new Error("useRegion must be used within a RegionProvider")
  }
  return context
}

interface RegionProviderProps {
  children: React.ReactNode
}

export const RegionProvider: React.FC<RegionProviderProps> = ({ children }) => {
  const [region, setRegion] = useState<Region>("nepal")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const savedRegion = localStorage.getItem("region") as Region
      if (savedRegion) {
        setRegion(savedRegion)
      } else {
        // Here you would implement IP-based detection
        // For now, we'll default to Nepal
        setRegion("nepal")
      }
    } catch (error) {
      console.error("Error loading region:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("region", region)
    } catch (error) {
      console.error("Error saving region:", error)
    }
  }, [region])

  const currency: Currency = region === "nepal" ? "NPR" : region === "india" ? "INR" : "USD"

  if (isLoading) {
    return null // or a loading spinner
  }

  return <RegionContext.Provider value={{ region, currency, setRegion }}>{children}</RegionContext.Provider>
}

export const currencySymbol = (currency: Currency) => {
  switch (currency) {
    case "NPR":
      return "रु"
    case "INR":
      return "₹"
    case "USD":
      return "$"
    default:
      return "$"
  }
}

export const convertPrice = (priceUSD: number, currency: Currency) => {
  // These conversion rates should be updated regularly in a real application
  const conversionRates = {
    NPR: 132.5,
    INR: 82.5,
    USD: 1,
  }
  return (priceUSD * conversionRates[currency]).toFixed(2)
}

