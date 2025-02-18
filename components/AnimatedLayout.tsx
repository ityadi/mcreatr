"use client"

import type React from "react"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

const AnimatedLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <motion.main
      key={pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-grow"
    >
      {children}
    </motion.main>
  )
}

export default AnimatedLayout

