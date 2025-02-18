import type { Product, Order, User, DesignSubmission } from "./types"

export const database = {
  products: [
    {
      id: "tshirt-1",
      name: "Organic Cotton",
      price: 2.99,
      description:
        "Eco-friendly v-neck t-shirt made from 100% organic cotton. Perfect for those who prioritize sustainability.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Illustrative%20Savage%20T-Shirt.zip%20-%207-FmvvUthu9VlGr6UeVQDkj0RuSikZSy.png",
      category: "T-Shirts",
      type: "customizable",
      colors: ["white", "gray", "green", "blue"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "hoodie-1",
      name: "Basic Hoodie",
      price: 4.99,
      description:
        "Cozy zip-up hoodie made from high-quality materials. Features a soft inner lining and durable outer layer.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Illustrative%20Savage%20T-Shirt.zip%20-%203-sG2KbwUsKaK7y3IYESkyQmR6zIf5VS.png",
      category: "Hoodies",
      type: "customizable",
      colors: ["black", "gray", "navy", "maroon"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "hoodie-2",
      name: "Pullover Sweatshirt",
      price: 2.99,
      description:
        "Classic pullover sweatshirt perfect for chilly days. Made with a cotton-polyester blend for comfort and durability.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Illustrative%20Savage%20T-Shirt.zip%20-%204-LlgjMYHMbMzzgXAV20BuDFESOa6PD4.png",
      category: "Hoodies",
      type: "customizable",
      colors: ["gray", "black", "blue", "green"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "hoodie-3",
      name: "Premium Hoodie",
      price: 6.99,
      description:
        "Premium cotton t-shirt perfect for custom designs. Soft, comfortable, and durable for everyday wear.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Illustrative%20Savage%20T-Shirt.zip%20-%202-kgniEMQp6o3YaDQpnwvQ4omV2tQI1C.png",
      category: "Hoodies",
      type: "customizable",
      colors: ["white", "black", "navy", "red"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "mug-1",
      name: "Classic Ceramic Mug",
      price: 1.99,
      description: "Durable ceramic mug perfect for your morning coffee or tea. Dishwasher and microwave safe.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mug-1.PNG-Pqxi6AZYzxTE5sCW6sJhREh4jowhHj.png",
      category: "Mugs",
      type: "customizable",
      colors: ["white", "black"],
    },
    {
      id: "mug-2",
      name: "Travel Tumbler",
      price: 2.99,
      description: "Insulated travel tumbler to keep your drinks hot or cold. Perfect for on-the-go lifestyles.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mug-2.PNG-Th6OEjizbCt9kcVsRVEMHzWFoeieOG.png",
      category: "Mugs",
      type: "customizable",
      colors: ["silver", "black", "blue"],
    },
    {
      id: "tote-1",
      name: "Canvas Tote Bag",
      price: 1.99,
      description: "Durable canvas tote bag perfect for shopping or carrying everyday items. Roomy and eco-friendly.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tote-1.PNG-mJLeVpRAJYYAn1eQqVOadze8wpulCG.png",
      category: "Accessories",
      type: "customizable",
      colors: ["natural", "black", "navy"],
    },
    {
      id: "cap-1",
      name: "Classic Baseball Cap",
      price: 1.89,
      description: "Adjustable baseball cap made from breathable cotton. Perfect for sunny days or casual wear.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Illustrative%20Savage%20T-Shirt.zip%20-%2010-8BIntVdxMTbkpdxQqUoJQO6L4RMQBt.png",
      category: "Accessories",
      type: "customizable",
      colors: ["black", "navy", "red", "white"],
    },
    {
      id: "phonecase-1",
      name: "Slim Phone Case",
      price: 9.99,
      description: "Sleek and protective phone case. Available for various phone models.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/phonecase-1.PNG-THG9lygfS6xk1MHtWHyvVvbsbud2m8.png",
      category: "Accessories",
      type: "customizable",
      colors: ["clear", "black", "white"],
    },
  ] as Product[],

  featuredDesigns: [
    {
      id: "featured-1",
      name: "Mountain Sunrise",
      designer: "NatureExplorer",
      price: 9.99,
      description:
        "Breathtaking mountain landscape with a vibrant sunrise. Perfect for nature lovers and adventure enthusiasts.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Illustrative%20Savage%20T-Shirt.zip%20-%202-kgniEMQp6o3YaDQpnwvQ4omV2tQI1C.png",
      category: "T-Shirts",
      type: "featured",
      colors: ["blue", "orange", "green"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "featured-2",
      name: "Abstract Waves",
      designer: "ModernArtist",
      price: 5.99,
      description: "Mesmerizing abstract wave pattern in soothing colors. Ideal for those who appreciate modern art.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/featured-2.PNG-dwGOqq7mawTU7nVoqhVSefhr55FFDK.png",
      category: "Hoodies",
      type: "featured",
      colors: ["blue", "purple", "teal"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "featured-3",
      name: "Vintage Floral",
      designer: "RetroDesigner",
      price: 7.99,
      description:
        "Elegant vintage floral pattern reminiscent of classic wallpaper designs. Perfect for adding a touch of nostalgia.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/featured-3.PNG-ok5JCYGAUL0AA08N3DLZyxb5lE7QeB.png",
      category: "Mugs",
      type: "featured",
      colors: ["cream", "pink", "green"],
    },
    {
      id: "featured-4",
      name: "Geometric Animals",
      designer: "PolygonArtist",
      price: 4.99,
      description: "Striking geometric representations of various animals. A modern twist on wildlife art.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/featured-4.PNG-Kk7V67TPhmHOrLzDmiTZ7wW4L9HXzB.png",
      category: "T-Shirts",
      type: "featured",
      colors: ["white", "gray", "black"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "featured-5",
      name: "Cosmic Journey",
      designer: "StarGazer",
      price: 9.99,
      description: "Awe-inspiring depiction of the cosmos, featuring galaxies, nebulae, and celestial bodies.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Illustrative%20Savage%20T-Shirt.zip%20-%203-sG2KbwUsKaK7y3IYESkyQmR6zIf5VS.png",
      category: "Hoodies",
      type: "featured",
      colors: ["black", "navy", "purple"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "featured-6",
      name: "Urban Sketch",
      designer: "CityArtist",
      price: 2.99,
      description: "Detailed hand-drawn sketch of a bustling cityscape. Captures the essence of urban life.",
      image: "",
      category: "Tote Bags",
      type: "featured",
      colors: ["natural", "black", "gray"],
    },
  ] as Product[],

  orders: [] as Order[],
  users: [] as User[],
  designSubmissions: [] as DesignSubmission[],
}

export const getRegionalPrice = (basePrice: number, currency: string): number => {
  const exchangeRates = {
    USD: 1,
    NPR: 132.5,
    INR: 82.5,
  }
  return Number.parseFloat((basePrice * exchangeRates[currency as keyof typeof exchangeRates]).toFixed(2))
}

