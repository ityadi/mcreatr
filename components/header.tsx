"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User, Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useApp } from "@/lib/context"
import { useRegion, currencySymbol } from "@/lib/regionContext"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { state } = useApp()
  const { region, currency, setRegion } = useRegion()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Featured", href: "/featured" },
    { name: "Shop", href: "/shop" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fadeIn">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between animate-slideIn">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              mCreatr
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">Select region</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setRegion("nepal")}>Nepal (NPR)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRegion("india")}>India (INR)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRegion("rest")}>Rest of World (USD)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {state.cart.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {state.cart.length}
                </span>
              )}
            </Link>
            <Link href="/account">
              <User className="h-6 w-6" />
            </Link>
            <Button variant="ghost" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      <div className="bg-muted py-1 text-center text-sm">Currently showing prices in {currencySymbol(currency)}</div>
    </header>
  )
}

