export interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
  category: string
  type: "customizable" | "featured"
  colors: string[]
  sizes?: string[]
  designer?: string
}

export interface CartItem {
  id: string
  productId: string
  quantity: number
  customization?: {
    text?: string
    image?: string
    color?: string
    size?: string
  }
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  shippingDetails: {
    name: string
    address: string
    phone: string
  }
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  orders: string[]
}

export interface DesignSubmission {
  id: string
  userId: string
  name: string
  description: string
  category: string
  images: string[]
  customizationOptions: {
    colors?: string[]
    sizes?: string[]
    positions?: string[]
  }
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

export interface Designer {
  id: string
  userId: string
  name: string
  bio: string
  portfolio: string
  submissions: string[]
  approvedDesigns: string[]
}

