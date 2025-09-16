"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { Menu, X, HelpCircle, Settings } from "lucide-react"

// Custom professional icons as SVG components
const SyntokLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="hsl(var(--accent))" />
    <path d="M8 12c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2v-8z" fill="white" />
    <path d="M18 8c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2V8z" fill="white" opacity="0.8" />
    <circle cx="12" cy="16" r="2" fill="hsl(var(--accent))" />
    <circle cx="22" cy="16" r="2" fill="hsl(var(--accent))" />
  </svg>
)

const TranslateIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
      fill="currentColor"
    />
  </svg>
)

const VoiceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2s-2-.9-2-2V4c0-1.1.9-2 2-2zm5.3 4.65c-.31 0-.6.13-.8.36-.2.23-.3.54-.3.85v2.14c0 3.31-2.69 6-6 6s-6-2.69-6-6v-.14c0-.31-.11-.62-.31-.85-.2-.23-.49-.36-.8-.36-.55 0-1 .45-1 1v2.14c0 4.42 3.58 8 8 8 .55 0 1-.45 1-1s-.45-1-1-1c-3.31 0-6-2.69-6-6v-.14c0-4.42 3.58-8 8-8 .55 0 1-.45 1-1s-.45-1-1-1c3.31 0 6 2.69 6 6v2.14c0 .55.45 1 1 1z"
      fill="currentColor"
    />
  </svg>
)

const CameraIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.4 10.5l4.77-8.26C13.47 2.09 12.75 2 12 2c-2.4 0-4.6.85-6.32 2.25l3.72 6.25zm-.2 1.5l-3.72 6.25C7.4 20.15 9.6 21 12 21c.75 0 1.47-.09 2.17-.24L9.4 12.5l-.2-.5zm8.54-3.5c-.64-1.11-1.48-2.05-2.54-2.73L12.5 9.5l2.7 4.5 2.54-4.5zm-1.64 6.5L12.5 9.5l-2.7 4.5 3.7 6.25c1.06-.68 1.9-1.62 2.54-2.73z"
      fill="currentColor"
    />
  </svg>
)

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: "/text-to-sign", label: "Text to Sign", icon: TranslateIcon },
    { href: "/speech-to-sign", label: "Speech to Sign", icon: VoiceIcon },
    { href: "/sign-to-text", label: "Sign to Text", icon: CameraIcon },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <SyntokLogo />
            <span className="text-2xl font-serif font-bold text-foreground">Syntok</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button key={item.href} variant="ghost" asChild className="gap-2">
                <Link href={item.href}>
                  {item.icon && <item.icon />}
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Help & Tutorial">
              <HelpCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/settings" aria-label="Settings">
                <Settings className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-card/95 backdrop-blur-sm">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  asChild
                  className="w-full justify-start gap-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href={item.href}>
                    {item.icon && <item.icon />}
                    {item.label}
                  </Link>
                </Button>
              ))}
              <div className="flex items-center justify-between pt-4 border-t">
                <Button variant="ghost" size="icon" aria-label="Help & Tutorial">
                  <HelpCircle className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/settings" aria-label="Settings">
                    <Settings className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
