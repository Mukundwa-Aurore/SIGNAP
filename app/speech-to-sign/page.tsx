"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { LanguageSelector } from "@/components/language-selector"
import { PlaybackControls } from "@/components/playback-controls"
import { ArrowLeft, Mic, MicOff, Download, Share2, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function SpeechToSignPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("asl")
  const [isTranslating, setIsTranslating] = useState(false)
  const [translationResult, setTranslationResult] = useState<any>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const { toast } = useToast()

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setHasPermission(true)
      stream.getTracks().forEach((track) => track.stop()) // Stop the stream after getting permission
      return true
    } catch (error) {
      setHasPermission(false)
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to use speech-to-sign translation.",
        variant: "destructive",
      })
      return false
    }
  }

  const startRecording = async () => {
    if (hasPermission === null) {
      const granted = await requestMicrophonePermission()
      if (!granted) return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      // Simulate speech recognition
      setIsRecording(true)
      setTranscript("")

      // Mock real-time transcription
      const mockWords = ["Hello", "how", "are", "you", "today", "I", "hope", "you", "are", "doing", "well"]
      let wordIndex = 0

      const addWord = () => {
        if (wordIndex < mockWords.length && isRecording) {
          setTranscript((prev) => prev + (prev ? " " : "") + mockWords[wordIndex])
          wordIndex++
          setTimeout(addWord, 800 + Math.random() * 400)
        }
      }

      setTimeout(addWord, 1000)
    } catch (error) {
      toast({
        title: "Recording failed",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      })
    }
  }

  const stopRecording = () => {
    setIsRecording(false)
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
    }

    if (transcript.trim()) {
      handleTranslate()
    }
  }

  const handleTranslate = async () => {
    if (!transcript.trim()) return

    setIsTranslating(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setTranslationResult({
        id: Date.now().toString(),
        originalText: transcript,
        language: selectedLanguage,
        frames: transcript.split(" ").map((word, index) => ({
          id: index + 1,
          sign: word.toUpperCase(),
          duration: 800 + Math.random() * 400,
        })),
        totalDuration: transcript.split(" ").length * 1000,
        confidence: 0.92,
      })

      toast({
        title: "Translation complete!",
        description: "Your speech has been translated to sign language.",
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

  const clearTranscript = () => {
    setTranscript("")
    setTranslationResult(null)
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
            <h1 className="text-xl font-serif font-semibold">Speech to Sign</h1>
            <p className="text-sm text-muted-foreground">Speak naturally and see it in sign language</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recording Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Voice Recording
                  {isRecording && (
                    <Badge variant="destructive" className="animate-pulse">
                      Recording
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Microphone Button */}
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`h-24 w-24 rounded-full ${
                      isRecording
                        ? "bg-destructive hover:bg-destructive/90 animate-pulse"
                        : "bg-accent hover:bg-accent/90"
                    }`}
                    aria-label={isRecording ? "Stop recording" : "Start recording"}
                  >
                    {isRecording ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
                  </Button>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {isRecording
                      ? "Listening... Speak clearly into your microphone"
                      : "Click the microphone to start recording"}
                  </p>
                  {hasPermission === false && (
                    <p className="text-sm text-destructive">
                      Microphone access required. Please check your browser settings.
                    </p>
                  )}
                </div>

                <LanguageSelector
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                  label="Target Sign Language"
                />
              </CardContent>
            </Card>

            {/* Live Transcript */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Live Transcript
                  {transcript && (
                    <Button variant="ghost" size="sm" onClick={clearTranscript}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-24 p-4 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
                  {transcript ? (
                    <p className="text-base leading-relaxed">{transcript}</p>
                  ) : (
                    <p className="text-muted-foreground italic">
                      {isRecording ? "Listening for speech..." : "Your spoken words will appear here"}
                    </p>
                  )}
                </div>
                {transcript && (
                  <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                    <span>Words: {transcript.split(" ").filter((w) => w.trim()).length}</span>
                    <span>Characters: {transcript.length}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Translation Output */}
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
                        <Mic className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">
                        {isTranslating ? "Generating sign animation..." : "Start recording to see sign translation"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Animation Preview */}
                    <div className="aspect-video bg-gradient-to-br from-accent/5 to-accent/10 rounded-lg flex items-center justify-center border">
                      <div className="text-center space-y-4">
                        <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-4xl">🤟</span>
                        </div>
                        <div className="space-y-2">
                          <p className="font-medium">Sign Animation Ready</p>
                          <p className="text-sm text-muted-foreground">
                            {translationResult.frames.length} signs •{" "}
                            {(translationResult.totalDuration / 1000).toFixed(1)}s
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

                    {/* Translation Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Confidence:</span>
                        <Badge variant="secondary">{(translationResult.confidence * 100).toFixed(0)}%</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Language:</span>
                        <Badge variant="outline">{selectedLanguage.toUpperCase()}</Badge>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" className="flex-1 bg-transparent">
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
