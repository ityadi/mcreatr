"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { database } from "@/lib/database"
import { useApp } from "@/lib/context"
import { useRegion, currencySymbol, convertPrice } from "@/lib/regionContext"
import { WhatsAppOrderPrompt } from "@/components/WhatsAppOrderPrompt"
import { ThankYouMessage } from "@/components/ThankYouMessage"
import type { CartItem } from "@/lib/types"
import { RegionProvider } from "@/lib/regionContext"
import { SHIPPING_CHARGE, DESIGN_PRINT_CHARGE, HANDLING_CHARGE } from "@/lib/constants"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function CartPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { state, dispatch } = useApp()
  const { currency } = useRegion()
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    phone: "",
  })
  const [showWhatsAppPrompt, setShowWhatsAppPrompt] = useState(false)
  const [showThankYouMessage, setShowThankYouMessage] = useState(false)

  useEffect(() => {
    // Load cart and shipping details from localStorage for returning users
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      const cart = JSON.parse(savedCart)
      cart.forEach((item: CartItem) => {
        dispatch({ type: "ADD_TO_CART", payload: item })
      })
    }

    const savedShippingDetails = localStorage.getItem("shippingDetails")
    if (savedShippingDetails) {
      setShippingDetails(JSON.parse(savedShippingDetails))
    }

    // Check if order was just completed
    const orderCompleted = localStorage.getItem("orderCompleted")
    if (orderCompleted === "true") {
      setShowThankYouMessage(true)
      localStorage.removeItem("orderCompleted")
    }
  }, [dispatch])

  const cartItems = state.cart.map((item) => {
    const product =
      database.products.find((p) => p.id === item.productId) ||
      database.featuredDesigns.find((p) => p.id === item.productId)
    return {
      ...item,
      product,
    }
  })

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0)
  const shippingCharge = SHIPPING_CHARGE
  const designPrintCharge = DESIGN_PRINT_CHARGE
  const handlingCharge = HANDLING_CHARGE
  const subtotalWithCharges = subtotal + shippingCharge + designPrintCharge + handlingCharge
  const vat = subtotalWithCharges * 0.13
  const total = subtotalWithCharges + vat

  const handleQuantityChange = (item: CartItem, quantity: number) => {
    if (quantity < 1) return
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: item.id, quantity },
    })
  }

  const handleRemoveItem = (itemId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: itemId })
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()

    if (!cartItems.length) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    // Save cart and shipping details to localStorage
    localStorage.setItem("cart", JSON.stringify(state.cart))
    localStorage.setItem("shippingDetails", JSON.stringify(shippingDetails))

    // Show WhatsApp prompt
    setShowWhatsAppPrompt(true)
  }

  return (
    <RegionProvider>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fadeIn">
        <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl drop-shadow-lg">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button onClick={() => router.push("/shop")} className="mt-4">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <div key={item.id} className="mb-4 flex items-center gap-4 rounded-lg border p-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={item.product?.image || "/placeholder.svg"}
                      alt={item.product?.name || "Product"}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h3 className="text-lg font-semibold">{item.product?.name}</h3>
                    {item.customization && (
                      <div className="mt-1 text-sm text-muted-foreground">
                        {item.customization.color && <p>Color: {item.customization.color}</p>}
                        {item.customization.size && <p>Size: {item.customization.size}</p>}
                      </div>
                    )}
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-sm text-muted-foreground hover:text-destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {currencySymbol(currency)}
                      {convertPrice((item.product?.price || 0) * item.quantity, currency)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="rounded-lg border p-4">
                <h2 className="text-lg font-semibold">Order Summary</h2>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                      {currencySymbol(currency)}
                      {convertPrice(subtotal, currency)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      Shipping Charge
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Covers the cost of packaging and delivery to your location.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </span>
                    <span>
                      {currencySymbol(currency)}
                      {convertPrice(shippingCharge, currency)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      Design & Print Charge
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Covers the cost of printing and applying your custom design.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </span>
                    <span>
                      {currencySymbol(currency)}
                      {convertPrice(designPrintCharge, currency)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      Handling Charge
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Covers order processing and preparation costs.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </span>
                    <span>
                      {currencySymbol(currency)}
                      {convertPrice(handlingCharge, currency)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      VAT (13%)
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Value Added Tax required by law.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </span>
                    <span>
                      {currencySymbol(currency)}
                      {convertPrice(vat, currency)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>
                      {currencySymbol(currency)}
                      {convertPrice(total, currency)}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleCheckout} className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={shippingDetails.name}
                      onChange={(e) =>
                        setShippingDetails({
                          ...shippingDetails,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Shipping Address</Label>
                    <Input
                      id="address"
                      value={shippingDetails.address}
                      onChange={(e) =>
                        setShippingDetails({
                          ...shippingDetails,
                          address: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={shippingDetails.phone}
                      onChange={(e) =>
                        setShippingDetails({
                          ...shippingDetails,
                          phone: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Place Order
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}

        {showWhatsAppPrompt && (
          <WhatsAppOrderPrompt
            orderDetails={{
              customerName: shippingDetails.name,
              phoneNumber: shippingDetails.phone,
              address: shippingDetails.address,
              total: total,
            }}
          />
        )}

        {showThankYouMessage && <ThankYouMessage />}
      </div>
    </RegionProvider>
  )
}

