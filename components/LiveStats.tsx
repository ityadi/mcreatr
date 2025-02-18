"use client"

import { useState, useEffect } from "react"
import { Users, Zap } from "lucide-react"

interface LiveStatsProps {
  initialViewers?: number
  initialCustomized?: number
}

export function LiveStats({ initialViewers = 0, initialCustomized = 0 }: LiveStatsProps) {
  const [viewers, setViewers] = useState(initialViewers)
  const [customized, setCustomized] = useState(initialCustomized)

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) => Math.max(0, prev + Math.floor(Math.random() * 3) - 1))
      setCustomized((prev) => prev + Math.floor(Math.random() * 2))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex space-x-4 text-sm font-medium text-muted-foreground">
      <div className="flex items-center">
        <Users className="w-4 h-4 mr-1 text-primary" />
        <span>{viewers} people are viewing this right now!</span>
      </div>
      <div className="flex items-center">
        <Zap className="w-4 h-4 mr-1 text-primary" />
        <span>{customized} customized today!</span>
      </div>
    </div>
  )
}

