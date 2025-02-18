"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement login logic here
    console.log("Login:", { email, password })
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setEmail("")
    setPassword("")
  }

  if (isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl drop-shadow-lg">
          Your Account
        </h1>
        <p className="mb-4">Welcome back! You are logged in.</p>
        <h2 className="text-2xl font-semibold mb-4">Order History</h2>
        <p className="text-muted-foreground">You have no orders yet.</p>
        <Button onClick={handleLogout} className="mt-4">
          Logout
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl drop-shadow-lg">
        Login / Sign Up
      </h1>
      <form onSubmit={handleLogin} className="max-w-md">
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Login / Sign Up</Button>
      </form>
    </div>
  )
}

