"use client"

import { DynamicTextVideo } from "@/components/DynamicTextVideo"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { database } from "@/lib/database"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RegionProvider } from "@/lib/regionContext"
import { useRegion, currencySymbol, convertPrice } from "@/lib/regionContext"
import { ErrorBoundary } from "react-error-boundary"
import { Loader2 } from "lucide-react"
import { FiClock, FiWhatsApp, FiAlertTriangle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";

const talks = [
  "mCreatr is revolutionizing print-on-demand!",
  "New designs dropping soon on mCreatr!",
  "Creators love mCreatr's platform!",
  "Print your ideas instantly with mCreatr!",
  "Scaling up—mCreatr now has 799 products!",
]

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <h2 className="text-xl font-semibold mb-4">Something went wrong:</h2>
      <pre className="text-red-500 mb-4">{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  )
}

export default function Home() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RegionProvider>
        <main className="min-h-screen">
          {/* Dynamic Video Section */}
          <div className="relative w-full h-screen overflow-hidden">
            <DynamicTextVideo className="absolute top-0 left-0 w-full h-full object-cover" />
          </div>

          {/* Promo Section */}
          <MCreatrPromo />

          {/* Business Opportunity Section */}
          <BusinessOpportunitySection />

          {/* Product Listing */}
          <ProductGrid />
        </main>
      </RegionProvider>
    </ErrorBoundary>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

function BusinessOpportunitySection() {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-6 sm:px-12 overflow-hidden">
      {/* Decorative Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-overlay blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500 rounded-full mix-blend-overlay blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 0.5,
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto text-center text-white relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6"
        >
          {/* Heading */}
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold tracking-tight drop-shadow-lg">
            Start Your Business with Premium Products at Unbeatable Prices!
          </motion.h2>

          {/* Description */}
          <motion.p variants={itemVariants} className="text-lg sm:text-xl text-gray-300">
            Whether you're launching a clothing brand, a gifting business, or a personalized merchandise store — we've
            got you covered. Get high-quality <strong>T-shirts, hoodies, mugs</strong>, and other essentials in one
            place and start your journey with confidence. The best prices. The best machines. The best start for your
            business.
          </motion.p>

          {/* Growth Numbers Showcase */}
          <motion.div variants={itemVariants} className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <motion.div
              className="bg-gray-700 p-6 rounded-lg shadow-2xl"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-bold text-white">10x Business Growth</h3>
              <p className="mt-2 text-base text-gray-300">
                Experience rapid 10x growth in revenue within the first year.
              </p>
            </motion.div>
            <motion.div
              className="bg-gray-700 p-6 rounded-lg shadow-2xl"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-bold text-white">Automate & Dominate</h3>
              <p className="mt-2 text-base text-gray-300">
                Streamline workflows, cut inefficiencies, and stay ahead of the competition.
              </p>
            </motion.div>
            <motion.div
              className="bg-gray-700 p-6 rounded-lg shadow-2xl"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-bold text-white">Scale Without Limits</h3>
              <p className="mt-2 text-base text-gray-300">
                From startups to enterprises, grow seamlessly without operational roadblocks.
              </p>
            </motion.div>
          </motion.div>

          {/* Call to Action Button */}
          <motion.div variants={itemVariants} className="mt-8">
            <Button
              asChild
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg transition-all shadow-lg transform hover:scale-105"
            >
              <Link href="https://wa.me/917488532440?text=I%20am%20interested%20in%20businesses" target="_blank">
                Contact Actipo Now
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Mobile-only Scroll Up Prompt */}
        <div className="mt-6 sm:hidden">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-base text-gray-400 animate-pulse"
          >
            Swipe up for more details
          </motion.p>
        </div>
      </div>
    </div>
  )
}
function MCreatrPromo() {
  const [talkIndex, setTalkIndex] = useState(0)

  useEffect(() => {
    const talkInterval = setInterval(() => {
      setTalkIndex((prev) => (prev + 1) % talks.length)
    }, 3000)

    return () => {
      clearInterval(talkInterval)
    }
  }, [])

  return (
    <div className="relative w-full flex items-center justify-center bg-black text-white py-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={talkIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-lg text-gray-400"
        >
          {talks[talkIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function ProductGrid() {
  const { currency } = useRegion()
  const products = database.products
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            custom={index}
            className="group overflow-hidden rounded-lg border bg-background p-4 transition-shadow hover:shadow-lg"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <div className="aspect-square overflow-hidden rounded-lg">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}>
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </div>
            <motion.div className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
              <p className="mt-2 text-lg font-bold">
                {currencySymbol(currency)}
                {convertPrice(product.price, currency)}
              </p>
              <motion.div
                className="mt-4 flex space-x-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 haptic-feedback"
                  onClick={() => {
                    if (navigator.vibrate) {
                      navigator.vibrate(10)
                    }
                  }}
                >
                  <Link href={`/product/${product.id}`}>View Details</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

