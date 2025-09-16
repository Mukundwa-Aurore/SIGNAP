import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Star, Zap, Crown } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
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
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Choose the plan that works best for you. All plans include our core translation features with different
            usage limits and premium features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Free Plan */}
          <Card className="relative border-2 hover:shadow-lg transition-all">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-4">
                <Star className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="font-serif text-2xl">Free</CardTitle>
              <CardDescription>Perfect for trying out Syntok</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-primary" />
                  <span>50 translations per month</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Text-to-sign translation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Basic accessibility features</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-primary" />
                  <span>ASL support</span>
                </div>
              </div>
              <Button className="w-full mt-8 bg-transparent" variant="outline">
                Get Started Free
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="relative border-2 border-primary hover:shadow-xl transition-all scale-105">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground px-4 py-1">Most Popular</Badge>
            </div>
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-serif text-2xl">Pro</CardTitle>
              <CardDescription>For regular users and professionals</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-primary">$9</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Unlimited translations</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-primary" />
                  <span>All translation modes</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-primary" />
                  <span>All sign languages (ASL, BSL, RSL)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Advanced accessibility features</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Translation history & export</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Priority support</span>
                </div>
              </div>
              <Button className="w-full mt-8">Start Pro Trial</Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="relative border-2 hover:shadow-lg transition-all">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-4">
                <Crown className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="font-serif text-2xl">Enterprise</CardTitle>
              <CardDescription>For organizations and institutions</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">Custom</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent" />
                  <span>Everything in Pro</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent" />
                  <span>Custom integrations</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent" />
                  <span>White-label solutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent" />
                  <span>Dedicated support</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent" />
                  <span>SLA guarantees</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-accent" />
                  <span>Custom training</span>
                </div>
              </div>
              <Button className="w-full mt-8 bg-transparent" variant="outline">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I change plans anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll
                  prorate any billing differences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our Free plan lets you try Syntok with 50 translations per month. Pro users get a 14-day free trial
                  with full access to all features.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We accept all major credit cards, PayPal, and bank transfers for Enterprise customers. All payments
                  are processed securely.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer discounts?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! We offer educational discounts for students and teachers, as well as non-profit discounts.
                  Contact us for more information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="text-center py-12">
            <h3 className="font-serif text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already breaking down communication barriers with Syntok. Start your free
              trial today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Start Free Trial</Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
