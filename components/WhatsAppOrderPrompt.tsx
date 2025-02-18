"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useApp } from "@/lib/context"
import { useRegion, currencySymbol, convertPrice } from "@/lib/regionContext"
import { database } from "@/lib/database"
import { ThankYouMessage } from "@/components/ThankYouMessage"
import { SHIPPING_CHARGE, DESIGN_PRINT_CHARGE, HANDLING_CHARGE } from "@/lib/constants"

interface WhatsAppOrderPromptProps {
  orderDetails: {
    customerName: string
    phoneNumber: string
    address: string
    total: number
  }
}

export function WhatsAppOrderPrompt({ orderDetails }: WhatsAppOrderPromptProps) {
  const { state, dispatch } = useApp()
  const { currency } = useRegion()
  const { toast } = useToast()
  const [isVisible, setIsVisible] = useState(false)
  const [showThankYouMessage, setShowThankYouMessage] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSendWhatsApp = () => {
    const phoneNumber = "+917488532440"
    const subtotal = state.cart.reduce((sum, item) => {
      const product =
        database.products.find((p) => p.id === item.productId) ||
        database.featuredDesigns.find((p) => p.id === item.productId)
      return sum + (product?.price || 0) * item.quantity
    }, 0)
    const shippingCharge = SHIPPING_CHARGE
    const designPrintCharge = DESIGN_PRINT_CHARGE
    const handlingCharge = HANDLING_CHARGE
    const subtotalWithCharges = subtotal + shippingCharge + designPrintCharge + handlingCharge
    const vat = subtotalWithCharges * 0.13
    const total = subtotalWithCharges + vat

    const message = `
🛒 New Order:
👤 Name: ${orderDetails.customerName}
📞 Phone: ${orderDetails.phoneNumber}
🏠 Address: ${orderDetails.address}
🌍 Region: Nepal

📦 Order Details:
${state.cart
  .map((item) => {
    const product =
      database.products.find((p) => p.id === item.productId) ||
      database.featuredDesigns.find((p) => p.id === item.productId)
    if (!product) return ""
    return `
- ${product.name}
  Color: ${item.customization?.color || "N/A"}
  Size: ${item.customization?.size || "N/A"}
  Quantity: ${item.quantity}
  Price: ${currencySymbol(currency)}${convertPrice(product.price * item.quantity, currency)}
  ${item.customization?.text ? `Custom Text: ${item.customization.text}` : ""}
  ${item.customization?.image ? `Custom Image: [Image Attached]` : ""}
`
  })
  .join("\n")}

💰 Order Summary:
Subtotal: ${currencySymbol(currency)}${convertPrice(subtotal, currency)}
Shipping Charge: ${currencySymbol(currency)}${convertPrice(shippingCharge, currency)}
Design & Print Charge: ${currencySymbol(currency)}${convertPrice(designPrintCharge, currency)}
Handling Charge: ${currencySymbol(currency)}${convertPrice(handlingCharge, currency)}
VAT (13%): ${currencySymbol(currency)}${convertPrice(vat, currency)}
Total: ${currencySymbol(currency)}${convertPrice(total, currency)}

Thank you for your order!
`

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    toast({
      title: "Order Sent",
      description: "Your order details have been sent via WhatsApp. Please complete the transaction there.",
    })

    // Clear the cart
    dispatch({ type: "CLEAR_CART" })

    setShowThankYouMessage(true)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4">Complete Your Order</h2>
        <p className="mb-4">
          Click the button below to send your order details via WhatsApp and complete your purchase.
        </p>
        <Button onClick={handleSendWhatsApp} className="w-full">
          Send Order via WhatsApp
        </Button>
      </div>
      {showThankYouMessage && <ThankYouMessage />}
    </div>
  )
}

