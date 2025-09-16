"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { LanguageSelector } from "@/components/language-selector"
import { ArrowLeft, Camera, Upload, Play, Volume2, Copy, Download, Share2, Trash2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignToTextPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("asl")
  const [isRecording, setIsRecording] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [translationResult, setTranslationResult] = useState<any>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const { toast } = useToast()

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      setHasPermission(true)
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      return stream
    } catch (error) {
      setHasPermission(false)
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to record sign language.",
        variant: "destructive",
      })
      return null
    }
  }

  const startRecording = async () => {
    const stream = await requestCameraPermission()
    if (!stream) return

    try {
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      const chunks: BlobPart[] = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" })
        setRecordedBlob(blob)
        stream.getTracks().forEach((track) => track.stop())
        if (videoRef.current) {
          videoRef.current.srcObject = null
        }
      }

      mediaRecorder.start()
      setIsRecording(true)

      // Auto-stop after 8 seconds
      setTimeout(() => {
        if (mediaRecorder.state === "recording") {
          stopRecording()
        }
      }, 8000)
    } catch (error) {
      toast({
        title: "Recording failed",
        description: "Could not start video recording. Please check permissions.",
        variant: "destructive",
      })
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file type
      if (!file.type.startsWith("video/") && !file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload a video or image file.",
          variant: "destructive",
        })
        return
      }

      // Check file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 50MB.",
          variant: "destructive",
        })
        return
      }

      setUploadedFile(file)
      setRecordedBlob(null)
    }
  }

  const analyzeSignLanguage = async () => {
    if (!uploadedFile && !recordedBlob) {
      toast({
        title: "No file to analyze",
        description: "Please upload a file or record a video first.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + Math.random() * 15
      })
    }, 200)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000))

      clearInterval(progressInterval)
      setAnalysisProgress(100)

      // Mock translation result
      const mockResults = [
        { text: "Hello, how are you today?", confidence: 0.94 },
        { text: "Thank you for your help", confidence: 0.89 },
        { text: "I am learning sign language", confidence: 0.92 },
        { text: "Nice to meet you", confidence: 0.96 },
        { text: "Have a great day", confidence: 0.87 },
      ]

      const result = mockResults[Math.floor(Math.random() * mockResults.length)]

      setTranslationResult({
        id: Date.now().toString(),
        text: result.text,
        confidence: result.confidence,
        language: selectedLanguage,
        processingTime: 2.8,
        fileName: uploadedFile?.name || "recorded_video.webm",
      })

      toast({
        title: "Analysis complete!",
        description: "Sign language has been translated to text.",
      })
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please try again or check your connection.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
      setAnalysisProgress(0)
    }
  }

  const speakText = () => {
    if (translationResult?.text && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(translationResult.text)
      utterance.rate = 0.8
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  const copyText = () => {
    if (translationResult?.text) {
      navigator.clipboard.writeText(translationResult.text)
      toast({
        title: "Text copied",
        description: "Translation has been copied to clipboard.",
      })
    }
  }

  const clearAll = () => {
    setUploadedFile(null)
    setRecordedBlob(null)
    setTranslationResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
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
            <h1 className="text-xl font-serif font-semibold">Sign to Text</h1>
            <p className="text-sm text-muted-foreground">Upload or record sign language to get text translation</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Camera Recording */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Record Sign Language
                  {isRecording && (
                    <Badge variant="destructive" className="animate-pulse">
                      Recording • {Math.floor((Date.now() % 8000) / 1000) + 1}s
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Video Preview */}
                <div className="aspect-video bg-muted/30 rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/20 relative">
                  {hasPermission !== false ? (
                    <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center space-y-2">
                        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
                        <p className="text-muted-foreground">Camera access required</p>
                      </div>
                    </div>
                  )}

                  {isRecording && (
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2 bg-destructive/90 text-destructive-foreground px-3 py-1 rounded-full text-sm">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        REC
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`flex-1 ${isRecording ? "bg-destructive hover:bg-destructive/90" : ""}`}
                    size="lg"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    {isRecording ? "Stop Recording" : "Start Recording"}
                  </Button>
                  {recordedBlob && (
                    <Button variant="outline" onClick={clearAll} size="lg">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {hasPermission === false && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Camera access is required to record sign language. Please allow camera permissions and refresh the
                      page.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Video or Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Drag and drop your file here, or click to browse</p>
                    <p className="text-xs text-muted-foreground">
                      Supports video (MP4, WebM) and images (JPG, PNG) up to 50MB
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*,image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="mt-4">
                    Choose File
                  </Button>
                </div>

                {uploadedFile && (
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent/20 rounded flex items-center justify-center">
                        {uploadedFile.type.startsWith("video/") ? (
                          <Play className="h-4 w-4" />
                        ) : (
                          <Camera className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{uploadedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={clearAll}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <LanguageSelector
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                  label="Source Sign Language"
                />

                <Button
                  onClick={analyzeSignLanguage}
                  disabled={isAnalyzing || (!uploadedFile && !recordedBlob)}
                  className="w-full"
                  size="lg"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Sign Language"}
                </Button>

                {isAnalyzing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processing...</span>
                      <span>{Math.round(analysisProgress)}%</span>
                    </div>
                    <Progress value={analysisProgress} className="w-full" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Translation Result</CardTitle>
              </CardHeader>
              <CardContent>
                {!translationResult ? (
                  <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                        <Camera className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">
                        {isAnalyzing
                          ? "Analyzing sign language..."
                          : "Upload or record sign language to see translation"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Translated Text */}
                    <div className="p-6 bg-gradient-to-br from-accent/5 to-accent/10 rounded-lg border">
                      <h3 className="text-lg font-semibold mb-3">Translated Text</h3>
                      <p className="text-xl leading-relaxed text-balance">"{translationResult.text}"</p>
                    </div>

                    {/* Text Actions */}
                    <div className="flex gap-2">
                      <Button onClick={speakText} variant="outline" className="flex-1 bg-transparent">
                        <Volume2 className="h-4 w-4 mr-2" />
                        Read Aloud
                      </Button>
                      <Button onClick={copyText} variant="outline" className="flex-1 bg-transparent">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Text
                      </Button>
                    </div>

                    <Separator />

                    {/* Analysis Details */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Analysis Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Confidence:</span>
                          <Badge variant={translationResult.confidence > 0.9 ? "default" : "secondary"}>
                            {(translationResult.confidence * 100).toFixed(0)}%
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Language:</span>
                          <Badge variant="outline">{selectedLanguage.toUpperCase()}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Processing:</span>
                          <span>{translationResult.processingTime}s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Words:</span>
                          <span>{translationResult.text.split(" ").length}</span>
                        </div>
                      </div>
                    </div>

                    {/* Export Actions */}
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

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tips for Better Results</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    Ensure good lighting and clear visibility of hands
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    Keep signs within the camera frame
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    Sign at a moderate pace for better recognition
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    Videos should be 3-8 seconds long for optimal results
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
