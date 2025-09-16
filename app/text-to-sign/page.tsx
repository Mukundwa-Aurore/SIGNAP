"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { LanguageSelector } from "@/components/language-selector"
import { PlaybackControls } from "@/components/playback-controls"
import { ArrowLeft, Download, Share2, Copy } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function TextToSignPage() {
  const [text, setText] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("asl")
  const [isTranslating, setIsTranslating] = useState(false)
  const [translationResult, setTranslationResult] = useState<any>(null)
  const { toast } = useToast()

  const handleTranslate = async () => {
    if (!text.trim()) {
      toast({
        title: "Please enter text",
        description: "Enter some text to translate into sign language.",
        variant: "destructive",
      })
      return
    }

    setIsTranslating(true)

    // Simulate API call - replace with actual translation service
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock translation result
      setTranslationResult({
        id: Date.now().toString(),
        originalText: text,
        language: selectedLanguage,
        frames: [
          { id: 1, sign: "HELLO", duration: 1000 },
          { id: 2, sign: "WORLD", duration: 1200 },
          { id: 3, sign: "HOW", duration: 800 },
          { id: 4, sign: "ARE", duration: 600 },
          { id: 5, sign: "YOU", duration: 1000 },
        ],
        totalDuration: 4600,
        confidence: 0.95,
      })

      toast({
        title: "Translation complete!",
        description: "Your text has been translated to sign language.",
      })
    } catch (error) {
      toast({
        title: "Translation failed",
        description: "Please try again or check your connection.",
        variant: "destructive",
      })
    } finally {
      setIsTranslating(false)
    }
  }

  const handleCopyText = () => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Text copied",
      description: "Text has been copied to clipboard.",
    })
  }

  const handleShare = () => {
    if (navigator.share && translationResult) {
      navigator.share({
        title: "Syntok Translation",
        text: `Sign language translation: "${translationResult.originalText}"`,
        url: window.location.href,
      })
    } else {
      toast({
        title: "Share link copied",
        description: "Translation link has been copied to clipboard.",
      })
    }
  }

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
            <h1 className="text-xl font-serif font-semibold">Text to Sign</h1>
            <p className="text-sm text-muted-foreground">Convert written text into sign language</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Input Text
                  <Badge variant="outline" className="text-xs">
                    {text.length}/500
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="text-input" className="sr-only">
                    Enter text to translate
                  </Label>
                  <Textarea
                    id="text-input"
                    placeholder="Type your message here... (e.g., 'Hello, how are you today?')"
                    value={text}
                    onChange={(e) => setText(e.target.value.slice(0, 500))}
                    className="min-h-32 resize-none text-base leading-relaxed"
                    aria-describedby="text-help"
                  />
                  <p id="text-help" className="text-xs text-muted-foreground mt-2">
                    Maximum 500 characters. Clear, simple sentences work best.
                  </p>
                </div>

                <LanguageSelector
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                  label="Target Sign Language"
                />

                <div className="flex gap-2">
                  <Button
                    onClick={handleTranslate}
                    disabled={isTranslating || !text.trim()}
                    className="flex-1"
                    size="lg"
                  >
                    {isTranslating ? "Translating..." : "Translate to Sign"}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleCopyText}
                    disabled={!text.trim()}
                    aria-label="Copy text"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Translation Info */}
            {translationResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Translation Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Language:</span>
                    <Badge variant="secondary">{selectedLanguage.toUpperCase()}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Signs:</span>
                    <span>{translationResult.frames.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{(translationResult.totalDuration / 1000).toFixed(1)}s</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Confidence:</span>
                    <span>{(translationResult.confidence * 100).toFixed(0)}%</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sign Language Animation</CardTitle>
              </CardHeader>
              <CardContent>
                {!translationResult ? (
                  <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                        <span className="text-2xl">👋</span>
                      </div>
                      <p className="text-muted-foreground">
                        {isTranslating ? "Generating sign animation..." : "Enter text and click translate to see signs"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Animation Preview Area */}
                    <div className="aspect-video bg-gradient-to-br from-accent/5 to-accent/10 rounded-lg flex items-center justify-center border">
                      <div className="text-center space-y-4">
                        <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-4xl">🤟</span>
                        </div>
                        <div className="space-y-2">
                          <p className="font-medium">Sign Animation Ready</p>
                          <p className="text-sm text-muted-foreground">
                            {translationResult.frames.length} signs •{" "}
                            {(translationResult.totalDuration / 1000).toFixed(1)}s duration
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Playback Controls */}
                    <PlaybackControls
                      isPlaying={false}
                      currentTime={0}
                      duration={translationResult.totalDuration}
                      onPlayPause={() => {}}
                      onSeek={() => {}}
                      onSpeedChange={() => {}}
                    />

                    <Separator />

                    {/* Sign Sequence */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Sign Sequence</h4>
                      <div className="flex flex-wrap gap-2">
                        {translationResult.frames.map((frame: any, index: number) => (
                          <Badge key={frame.id} variant="outline" className="text-xs">
                            {index + 1}. {frame.sign}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" onClick={handleShare} className="flex-1 bg-transparent">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
