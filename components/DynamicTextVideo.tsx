"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Scene {
  text: string
  duration: number
  holdTime: number
}

interface Script {
  name: string
  scenes: Scene[]
  infinite?: boolean
}

const scripts: Script[] = [
  // Navigation/Main Pages
  {
    name: "mCreatr",
    scenes: [
      { text: "Your creative journey begins here.", duration: 1200, holdTime: 1000 },
      { text: "Let's create something amazing.", duration: 1200, holdTime: 1500 },
    ],
  },
  {
    name: "Shop",
    scenes: [
      { text: "Discover amazing designs.", duration: 1200, holdTime: 1000 },
      { text: "Shop unique creations.", duration: 1200, holdTime: 1000 },
      { text: "Support independent artists.", duration: 1200, holdTime: 1500 },
    ],
  },
  {
    name: "Customize",
    scenes: [
      { text: "Make it yours.", duration: 1200, holdTime: 1000 },
      { text: "Customize to perfection.", duration: 1200, holdTime: 1000 },
      { text: "Express your individuality.", duration: 1200, holdTime: 1500 },
    ],
  },
  {
    name: "Features",
    scenes: [
      { text: "Explore powerful tools.", duration: 1200, holdTime: 1000 },
      { text: "Innovative features at your fingertips.", duration: 1200, holdTime: 1000 },
      { text: "Transform your ideas into reality.", duration: 1200, holdTime: 1500 },
    ],
  },

  // Additional Detailed Scripts
  {
    name: "The Future of Creation",
    scenes: [
      // Opening
      { text: "You think it.", duration: 1200, holdTime: 1000 },
      { text: "You design it.", duration: 1200, holdTime: 1000 },
      { text: "You sell it.", duration: 1200, holdTime: 1500 },
      { text: "It's that simple.", duration: 1200, holdTime: 1500 },
      // The Problem
      { text: "Starting is hard.", duration: 1200, holdTime: 1000 },
      { text: "Costs are high.", duration: 1200, holdTime: 1000 },
      { text: "Sales are slow.", duration: 1200, holdTime: 1000 },
      { text: "Not anymore.", duration: 1200, holdTime: 1500 },
      // The Revolution
      { text: "One platform.", duration: 1200, holdTime: 1000 },
      { text: "Endless possibilities.", duration: 1200, holdTime: 1500 },
      { text: "Design.", duration: 1000, holdTime: 800 },
      { text: "Print.", duration: 1000, holdTime: 800 },
      { text: "Sell.", duration: 1000, holdTime: 800 },
      { text: "Repeat.", duration: 1200, holdTime: 1500 },
      // Closing
      { text: "Your vision. Your brand.", duration: 1500, holdTime: 2000 },
      { text: "Your time is now.", duration: 1500, holdTime: 1500 },
      { text: "mCreatr.", duration: 2000, holdTime: 3000 },
    ],
  },
  {
    name: "The Creator's Journey",
    scenes: [
      // The Dream
      { text: "You have an idea.", duration: 1200, holdTime: 1000 },
      { text: "A design in your mind.", duration: 1200, holdTime: 1000 },
      { text: "But then...", duration: 1200, holdTime: 1500 },
      // The Struggle
      { text: "Where to start?", duration: 1200, holdTime: 1000 },
      { text: "Too expensive?", duration: 1200, holdTime: 1000 },
      { text: "Too confusing?", duration: 1200, holdTime: 1500 },
      // The Solution
      { text: "Design effortlessly.", duration: 1200, holdTime: 1000 },
      { text: "Sell instantly.", duration: 1200, holdTime: 1000 },
      { text: "Make an impact.", duration: 1200, holdTime: 1500 },
      // Final Impact
      { text: "From your mind to the world.", duration: 1500, holdTime: 2000 },
      { text: "mCreatr.", duration: 2000, holdTime: 3000 },
    ],
  },
  {
    name: "What If It Was Easy?",
    scenes: [
      // The Question
      { text: "What if selling your designs...", duration: 1200, holdTime: 1000 },
      { text: "Was easy?", duration: 1200, holdTime: 1500 },
      // Current Struggles
      { text: "No setup costs.", duration: 1200, holdTime: 1000 },
      { text: "No complicated process.", duration: 1200, holdTime: 1000 },
      { text: "No delays.", duration: 1200, holdTime: 1500 },
      // The Solution
      { text: "Just create.", duration: 1200, holdTime: 1000 },
      { text: "Upload.", duration: 1200, holdTime: 1000 },
      { text: "Sell.", duration: 1200, holdTime: 1500 },
      // Final CTA
      { text: "Your ideas. Your brand.", duration: 1500, holdTime: 2000 },
      { text: "mCreatr.", duration: 2000, holdTime: 3000 },
    ],
  },
  {
    name: "The Power of Creation",
    scenes: [
      // Opening
      { text: "You've got the talent.", duration: 1200, holdTime: 1000 },
      { text: "You've got the ideas.", duration: 1200, holdTime: 1000 },
      { text: "Now, let's make it real.", duration: 1200, holdTime: 1500 },
      // The Frustration
      { text: "Other platforms?", duration: 1200, holdTime: 1000 },
      { text: "Too expensive.", duration: 1200, holdTime: 1000 },
      { text: "Too complicated.", duration: 1200, holdTime: 1500 },
      // The Solution
      { text: "Easy setup.", duration: 1200, holdTime: 1000 },
      { text: "Instant sales.", duration: 1200, holdTime: 1000 },
      { text: "No hassle.", duration: 1200, holdTime: 1500 },
      // Call to Action
      { text: "Start now. No limits.", duration: 1500, holdTime: 2000 },
      { text: "mCreatr.", duration: 2000, holdTime: 3000 },
    ],
  },
  {
    name: "Design Without Boundaries",
    scenes: [
      // Introduction
      { text: "Step out of the box.", duration: 1200, holdTime: 1000 },
      { text: "Explore endless possibilities.", duration: 1200, holdTime: 1000 },
      { text: "Your art knows no limits.", duration: 1200, holdTime: 1500 },
      // The Challenge
      { text: "Tired of restrictions?", duration: 1200, holdTime: 1000 },
      { text: "Traditional platforms hold you back.", duration: 1200, holdTime: 1500 },
      // The mCreatr Solution
      { text: "Unchain your creativity.", duration: 1200, holdTime: 1000 },
      { text: "Design. Print. Sell.", duration: 1200, holdTime: 1500 },
      // Final Call
      { text: "Design without boundaries.", duration: 1500, holdTime: 2000 },
      { text: "mCreatr.", duration: 2000, holdTime: 3000 },
    ],
  },
  {
    name: "Unleash Your Creativity",
    scenes: [
      // Awakening
      { text: "Deep inside, you have brilliance.", duration: 1200, holdTime: 1000 },
      { text: "Waiting to be unleashed.", duration: 1200, holdTime: 1500 },
      // The Barrier
      { text: "But obstacles hold you back...", duration: 1200, holdTime: 1000 },
      { text: "Complex systems and high fees.", duration: 1200, holdTime: 1500 },
      // The mCreatr Promise
      { text: "Break free. Create freely.", duration: 1200, holdTime: 1000 },
      { text: "Your vision, your rules.", duration: 1200, holdTime: 1500 },
      // Final Statement
      { text: "Unleash your creativity.", duration: 1500, holdTime: 2000 },
      { text: "mCreatr.", duration: 2000, holdTime: 3000 },
    ],
  },
  {
    name: "Simplify Your Success",
    scenes: [
      // Introduction
      { text: "Success shouldn't be complicated.", duration: 1200, holdTime: 1000 },
      { text: "Your talent deserves a straightforward path.", duration: 1200, holdTime: 1500 },
      // The Challenge
      { text: "Complex platforms? Overwhelming fees?", duration: 1200, holdTime: 1000 },
      { text: "We say: Enough is enough.", duration: 1200, holdTime: 1500 },
      // The mCreatr Approach
      { text: "Simple setup.", duration: 1200, holdTime: 1000 },
      { text: "Instant sales.", duration: 1200, holdTime: 1500 },
      // Final Call
      { text: "Simplify your success.", duration: 1500, holdTime: 2000 },
      { text: "mCreatr.", duration: 2000, holdTime: 3000 },
    ],
  },
  {
    name: "Create, Connect, Conquer",
    scenes: [
      // Opening
      { text: "Create your masterpiece.", duration: 1200, holdTime: 1000 },
      { text: "Connect with a global audience.", duration: 1200, holdTime: 1000 },
      { text: "Conquer the creative world.", duration: 1200, holdTime: 1500 },
      // The Struggle
      { text: "Traditional platforms limit your reach.", duration: 1200, holdTime: 1000 },
      { text: "Expensive setups and slow processes.", duration: 1200, holdTime: 1500 },
      // The mCreatr Way
      { text: "Seamless integration.", duration: 1200, holdTime: 1000 },
      { text: "Rapid growth.", duration: 1200, holdTime: 1500 },
      // Final CTA
      { text: "Create, connect, conquer.", duration: 1500, holdTime: 2000 },
      { text: "mCreatr.", duration: 2000, holdTime: 3000 },
    ],
  },
  {
    name: "Where Ideas Become Reality",
    scenes: [
      // Dreaming
      { text: "Every idea has potential.", duration: 1200, holdTime: 1000 },
      { text: "Every sketch tells a story.", duration: 1200, holdTime: 1000 },
      // The Challenge
      { text: "But turning dreams into reality is tough.", duration: 1200, holdTime: 1500 },
      { text: "High costs and complex systems block your way.", duration: 1200, holdTime: 1500 },
      // The Transformation
      { text: "Step into a world where ideas thrive.", duration: 1200, holdTime: 1000 },
      { text: "Simple. Fast. Effective.", duration: 1200, holdTime: 1500 },
      // Final Impact
      { text: "Where ideas become reality.", duration: 1500, holdTime: 2000 },
      { text: "mCreatr.", duration: 2000, holdTime: 3000 },
    ],
  },
  {
    name: "Empower Your Vision",
    scenes: [
      // Inspiration
      { text: "Your vision is unique.", duration: 1200, holdTime: 1000 },
      { text: "It's time to empower it.", duration: 1200, holdTime: 1500 },
      // The Obstacle
      { text: "Outdated platforms hold you back.", duration: 1200, holdTime: 1000 },
      { text: "High barriers and slow processes.", duration: 1200, holdTime: 1500 },
      // The Promise
      { text: "Empower your art.", duration: 1200, holdTime: 1000 },
      { text: "Sell effortlessly.", duration: 1200, holdTime: 1500 },
      // Final Message
      { text: "Empower your vision.", duration: 1500, holdTime: 2000 },
      { text: "mCreatr.", duration: 2000, holdTime: 3000 },
    ],
  },
]

// Define the shape of our persisted state
interface VideoState {
  scriptIndex: number
  sceneIndex: number
  sceneStartTime: number
}

function getInitialState(): VideoState {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("videoState")
    if (stored) {
      try {
        const parsed: VideoState = JSON.parse(stored)
        // Calculate how far we are into the current scene
        const elapsed = Date.now() - parsed.sceneStartTime
        const currentScene = scripts[parsed.scriptIndex].scenes[parsed.sceneIndex]
        const sceneTotal = currentScene.duration + currentScene.holdTime

        let scriptIndex = parsed.scriptIndex
        let sceneIndex = parsed.sceneIndex
        let sceneStartTime = parsed.sceneStartTime

        // Advance scene(s) if elapsed time exceeds current scene's total time
        let remaining = elapsed
        while (remaining > sceneTotal) {
          remaining -= sceneTotal
          sceneIndex++
          if (sceneIndex >= scripts[scriptIndex].scenes.length) {
            // If current script is infinite, remain here; otherwise, move to next script
            if (scripts[scriptIndex].infinite) {
              sceneIndex = 0
            } else {
              scriptIndex = (scriptIndex + 1) % scripts.length
              sceneIndex = 0
            }
          }
          sceneStartTime = Date.now() - remaining
          // Update sceneTotal for the new scene
          const newScene = scripts[scriptIndex].scenes[sceneIndex]
          remaining = remaining // for clarity
          // Update sceneTotal for next loop iteration
          if (newScene) {
            // eslint-disable-next-line no-loop-func
          }
        }
        return { scriptIndex, sceneIndex, sceneStartTime }
      } catch (e) {
        console.error("Error parsing videoState:", e)
      }
    }
  }
  return { scriptIndex: 0, sceneIndex: 0, sceneStartTime: Date.now() }
}

export function DynamicTextVideo() {
  const [videoState, setVideoState] = useState<VideoState>(getInitialState())
  const { scriptIndex, sceneIndex, sceneStartTime } = videoState

  const currentScript = scripts[scriptIndex]
  const currentScene = currentScript.scenes[sceneIndex]

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem("videoState", JSON.stringify(videoState))
  }, [videoState])

  // Set timeout for the remainder of the current scene
  useEffect(() => {
    const elapsed = Date.now() - sceneStartTime
    const sceneTotal = currentScene.duration + currentScene.holdTime
    const remainingTime = Math.max(sceneTotal - elapsed, 0)

    const timer = setTimeout(() => {
      // Advance to next scene
      let newScriptIndex = scriptIndex
      let newSceneIndex = sceneIndex + 1
      if (newSceneIndex >= currentScript.scenes.length) {
        // If the script is infinite, loop within it; otherwise, move to next script
        if (currentScript.infinite) {
          newSceneIndex = 0
        } else {
          newScriptIndex = (scriptIndex + 1) % scripts.length
          newSceneIndex = 0
        }
      }
      setVideoState({
        scriptIndex: newScriptIndex,
        sceneIndex: newSceneIndex,
        sceneStartTime: Date.now(),
      })
    }, remainingTime)

    return () => clearTimeout(timer)
  }, [scriptIndex, sceneIndex, sceneStartTime, currentScene, currentScript.scenes.length])

  const fadeVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  const backgroundVariants = {
    initial: { background: "linear-gradient(45deg, #000 0%, #111 100%)" },
    animate: {
      background: ["linear-gradient(45deg, #000 0%, #111 100%)", "linear-gradient(45deg, #111 0%, #000 100%)"],
      transition: {
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  }

  return (
    <motion.div
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
      variants={backgroundVariants}
      initial="initial"
      animate="animate"
    >
      {/* Ambient animated background gradient */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Additional animated art elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <motion.div
          className="absolute bg-blue-500 rounded-full opacity-30"
          style={{ width: 100, height: 100, top: "20%", left: "10%" }}
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
        />
        <motion.div
          className="absolute bg-red-500 rounded-full opacity-30"
          style={{ width: 80, height: 80, top: "50%", left: "70%" }}
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
        />
        {/* Add more shapes or drawings as desired */}
      </motion.div>

      {/* Main Text Overlay */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${scriptIndex}-${sceneIndex}`}
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: currentScene.duration / 1000,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
            className="text-white font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight"
          >
            {currentScene.text}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Script Name for Accessibility */}
      <div className="sr-only" aria-live="polite">
        Currently playing: {currentScript.name}
      </div>
    </motion.div>
  )
}

