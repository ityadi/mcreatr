"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface TextScene {
  type: "text"
  content: string[]
  duration: number
  background: string
  textColor: string
}

interface ImmersiveTextFrameProps {
  scenes: TextScene[]
}

export function ImmersiveTextFrame({ scenes }: ImmersiveTextFrameProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef(null)
  const controls = useAnimation()
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % scenes.length)
    }, scenes[currentIndex].duration)

    return () => clearTimeout(timer)
  }, [currentIndex, scenes])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: custom * 0.2,
      },
    }),
  }

  const currentScene = scenes[currentIndex]

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-screen relative overflow-hidden flex items-center justify-center"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      style={{ backgroundColor: currentScene.background }}
    >
      <div className="text-center px-4 sm:px-6 lg:px-8">
        {currentScene.content.map((line, index) => (
          <motion.p
            key={index}
            custom={index}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${currentScene.textColor}`}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </motion.div>
  )
}

