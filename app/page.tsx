"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OnboardingModal } from "@/components/onboarding-modal"
import { Navbar } from "@/components/navbar"
import { MessageSquare, Mic, Camera, Settings, History, Share2, Play, Users, Star, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)

  const demoTexts = ["Hello, how are you?", "Thank you very much", "Nice to meet you", "Have a great day!"]

  useEffect(() => {
    setIsVisible(true)
    const hasCompletedOnboarding = localStorage.getItem("syntok-onboarding-completed")
    if (!hasCompletedOnboarding) {
      setTimeout(() => setShowOnboarding(true), 1000)
    }

    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % demoTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />

      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-3xl -z-10" />

          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h1 className="text-6xl md:text-7xl font-serif font-bold text-foreground mb-6 text-balance">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                SynTok
              </span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground/80 mb-4 text-balance">
              Bridge Communication with Sign Language
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 text-pretty leading-relaxed">
              Syntok makes sign language accessible to everyone. Translate text to sign, speech to sign, or sign to text
              with AI-powered accuracy and support for multiple sign languages.
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <Card className="border-2 border-primary/30 bg-gradient-to-br from-card to-primary/5 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-muted-foreground">Live Demo</span>
                </div>
                <CardTitle className="text-lg">Try it now:</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-6 mb-4 border border-secondary/20">
                  <p className="text-lg font-medium mb-4 transition-all duration-500">"{demoTexts[currentDemo]}"</p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center animate-pulse">
                      <MessageSquare className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-2xl text-secondary font-bold">→</div>
                    <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👋</span>
                    </div>
                  </div>
                </div>
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Play className="h-4 w-4 mr-2" />
                  Start Your First Translation
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Translations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">3</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">98%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
              <Star className="h-3 w-3 mr-1" />
              ASL Support
            </Badge>
            <Badge variant="outline" className="bg-secondary/10 border-secondary/30 text-secondary">
              <Star className="h-3 w-3 mr-1" />
              BSL Support
            </Badge>
            <Badge variant="outline" className="bg-accent/10 border-accent/30 text-accent-foreground">
              <Star className="h-3 w-3 mr-1" />
              RSL Support
            </Badge>
            <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
              <Users className="h-3 w-3 mr-1" />
              Fully Accessible
            </Badge>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 hover:-translate-y-1 bg-gradient-to-br from-card to-primary/5">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl font-serif">Text to Sign</CardTitle>
              <CardDescription className="text-pretty">
                Type your message and see it translated into sign language animations with real-time preview
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors"
                size="lg"
              >
                <Link href="/text-to-sign">Start Translating</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-secondary/50 hover:-translate-y-1 bg-gradient-to-br from-card to-secondary/5">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Mic className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle className="text-xl font-serif">Speech to Sign</CardTitle>
              <CardDescription className="text-pretty">
                Speak naturally and watch your words transform into sign language with voice recognition
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                asChild
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
                size="lg"
              >
                <Link href="/speech-to-sign">Start Speaking</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/50 hover:-translate-y-1 bg-gradient-to-br from-card to-accent/5">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Camera className="h-8 w-8 text-accent-foreground" />
              </div>
              <CardTitle className="text-xl font-serif">Sign to Text</CardTitle>
              <CardDescription className="text-pretty">
                Upload a video or use your camera to translate sign language into text instantly
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                asChild
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                size="lg"
              >
                <Link href="/sign-to-text">Upload Signs</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="bg-gradient-to-r from-muted/30 to-accent/5 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-serif font-semibold mb-6 text-center">Quick Access</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="outline"
              asChild
              className="flex items-center gap-2 bg-card/50 hover:bg-card border-accent/20 hover:border-accent/40"
            >
              <Link href="/history">
                <History className="h-4 w-4" />
                Recent Translations
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="flex items-center gap-2 bg-card/50 hover:bg-card border-accent/20 hover:border-accent/40"
            >
              <Link href="/share">
                <Share2 className="h-4 w-4" />
                Share & Export
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="flex items-center gap-2 bg-card/50 hover:bg-card border-accent/20 hover:border-accent/40"
            >
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </Button>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-3xl font-serif font-semibold mb-8 text-center">What Our Users Say</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-card to-accent/5">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent opacity-40" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 italic">
                  "Syntok has revolutionized how I communicate with my deaf colleagues. The accuracy is incredible!"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    
                  </div>
                  <div>
                    
                    
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-accent/5">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent opacity-40" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 italic">
                  "As a deaf person, this app helps me understand spoken conversations in real-time. Game changer!"
                </p>
                
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-accent/5">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent opacity-40 text-secondary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 italic">
                  "The interface is so intuitive and accessible. Perfect for learning sign language!"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    
                  </div>
                  <div>
                    <p className="text-sm font-medium">Mukundwa Aurore</p>
                    <p className="text-xs text-muted-foreground">Project Manager</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center">
          <Card className="max-w-3xl mx-auto bg-gradient-to-br from-card to-secondary/5 border-2 border-secondary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-serif flex items-center justify-center gap-2">
                <TrendingUp className="h-6 w-6 text-secondary" />
                About Syntok
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                Syntok is designed with accessibility at its core, ensuring that everyone can communicate effectively
                regardless of hearing ability. Our AI-powered platform supports multiple sign languages and provides
                high-quality translations with an intuitive, barrier-free interface that's trusted by thousands of users
                worldwide.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t mt-16 py-8 bg-gradient-to-r from-muted/20 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">© 2025 Rwanda Coding Academy</p>
        </div>
      </footer>
    </div>
  )
}
