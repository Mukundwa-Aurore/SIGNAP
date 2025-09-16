import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Globe, Heart, Award, Target, Lightbulb } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary mb-6">About Syntok</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Breaking down communication barriers through innovative sign language technology. We believe everyone
            deserves to be heard and understood.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Target className="h-6 w-6 text-primary" />
                <CardTitle className="font-serif text-2xl">Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To create accessible, accurate, and intuitive sign language translation technology that empowers deaf
                and hard-of-hearing communities worldwide. We're committed to fostering inclusive communication for
                everyone.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Lightbulb className="h-6 w-6 text-accent" />
                <CardTitle className="font-serif text-2xl">Our Vision</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                A world where sign language is universally understood and accessible through technology, creating
                seamless communication between deaf and hearing communities across all cultures and languages.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl font-bold text-center mb-12">Why Choose Syntok?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="font-serif">Multi-Language Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Supporting ASL, BSL, and Rwandan Sign Language with plans for more languages.
                </p>
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  <Badge variant="secondary">ASL</Badge>
                  <Badge variant="secondary">BSL</Badge>
                  <Badge variant="secondary">RSL</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle className="font-serif">Accessibility First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built with comprehensive accessibility features including high contrast, voice guidance, and
                  customizable interfaces.
                </p>
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  <Badge variant="outline">WCAG 2.1</Badge>
                  <Badge variant="outline">Screen Reader</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="font-serif">Accurate Translation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced AI technology ensures high-accuracy translations with continuous learning and improvement.
                </p>
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  <Badge variant="secondary">95% Accuracy</Badge>
                  <Badge variant="secondary">Real-time</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">50K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent">1M+</div>
              <div className="text-muted-foreground">Translations</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">3</div>
              <div className="text-muted-foreground">Sign Languages</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent">95%</div>
              <div className="text-muted-foreground">Accuracy Rate</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="text-center py-12">
            <Users className="h-16 w-16 text-primary mx-auto mb-6" />
            <h3 className="font-serif text-2xl font-bold mb-4">Join Our Community</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be part of a growing community that's making communication accessible for everyone. Start translating
              today and help us build a more inclusive world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/text-to-sign">Start Translating</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
