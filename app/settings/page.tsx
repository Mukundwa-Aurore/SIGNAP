"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AccessibilityControls } from "@/components/accessibility-controls"
import { ArrowLeft, Shield, Bell, Database, Info } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/" aria-label="Back to home">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-serif font-semibold">Settings</h1>
            <p className="text-sm text-muted-foreground">Customize your Syntok experience</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Accessibility Settings */}
          <section>
            <AccessibilityControls />
          </section>

          {/* Privacy & Permissions */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Permissions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">Camera Access</h4>
                      <p className="text-sm text-muted-foreground">Required for recording sign language videos</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Check Permission
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">Microphone Access</h4>
                      <p className="text-sm text-muted-foreground">Required for speech-to-sign translation</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Check Permission
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-medium">Data Processing</h4>
                    <p className="text-sm text-muted-foreground">
                      Your videos and audio are processed securely and are not stored permanently. All translations
                      happen with privacy protection in mind.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Notifications */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">Translation Complete</h4>
                    <p className="text-sm text-muted-foreground">Get notified when translations are ready</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">Feature Updates</h4>
                    <p className="text-sm text-muted-foreground">Stay informed about new features and improvements</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Data & Storage */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data & Storage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">Translation History</h4>
                    <p className="text-sm text-muted-foreground">Clear all saved translations and history</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Clear History
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">Cached Data</h4>
                    <p className="text-sm text-muted-foreground">Remove temporary files and cached content</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Clear Cache
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium">Export Data</h4>
                  <p className="text-sm text-muted-foreground">Download your translation history and preferences</p>
                  <Button variant="outline" size="sm">
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* About */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  About Syntok
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Version:</span>
                    <span>1.0.0 Beta</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span>December 2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Supported Languages:</span>
                    <span>ASL, BSL, RSL</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium">Support & Feedback</h4>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/help">Help Center</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/feedback">Send Feedback</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/privacy">Privacy Policy</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
