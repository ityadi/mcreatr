"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface OrderDetails {
  customerName: string
  phoneNumber: string
  address: string
  product: string
  color: string
  size: string
  quantity: number
  price: number
}

const currencySymbol = (currency: string): string => {
  switch (currency) {
    case "USD":
      return "$"
    case "EUR":
      return "€"
    default:
      return ""
  }
}

const convertPrice = (price: number, currency: string): number => {
  // Add your currency conversion logic here if needed
  return price
}

export function OrderProcessing({ orderDetails }: { orderDetails: OrderDetails }) {
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)

  const generateInvoice = (order: OrderDetails) => {
    // In a real app, this would generate a PDF invoice
    console.log("Generating invoice for order:", order)
    return "invoice_12345.pdf"
  }

  const sendWhatsAppMessage = async (order: OrderDetails, invoiceUrl: string) => {
    const message = `
📦 New Order Placed!
👤 Customer Name: ${order.customerName}
📞 Contact Number: ${order.phoneNumber}
🏠 Delivery Address: ${order.address}
🛍️ Order Details:
  • Product: ${order.product}
  • Color: ${order.color}
  • Size: ${order.size}
  • Quantity: ${order.quantity}
  • Price: ${currencySymbol("USD")}${convertPrice(order.price, "USD")}

🚚 Order Status: Processing
📆 Expected Delivery: ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}

🔔 You'll receive updates once your order is dispatched!

📎 Invoice: ${invoiceUrl}
`

    // In a real app, this would use the WhatsApp Business API
    console.log("Sending WhatsApp message to customer:", message)
    console.log("Sending WhatsApp message to order center:", message)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  const processOrder = async () => {
    setIsProcessing(true)
    try {
      const invoiceUrl = generateInvoice(orderDetails)
      await sendWhatsAppMessage(orderDetails, invoiceUrl)
      toast({
        title: "Order Processed Successfully",
        description: "Invoice and order details have been sent via WhatsApp.",
      })
    } catch (error) {
      console.error("Error processing order:", error)
      toast({
        title: "Error Processing Order",
        description: "Please try again or contact customer support.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Button onClick={processOrder} disabled={isProcessing}>
      {isProcessing ? "Processing..." : "Process Order"}
    </Button>
  )
}

