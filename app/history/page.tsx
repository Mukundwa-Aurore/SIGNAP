"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Play, Copy, Share2, Trash2, MessageSquare, Mic, Camera } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface TranslationHistory {
  id: string
  type: "text-to-sign" | "speech-to-sign" | "sign-to-text"
  originalText: string
  translatedText?: string
  language: string
  confidence?: number
  timestamp: Date
  duration?: number
}

const mockHistory: TranslationHistory[] = [
  {
    id: "1",
    type: "text-to-sign",
    originalText: "Hello, how are you today?",
    language: "asl",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    duration: 4.2,
  },
  {
    id: "2",
    type: "speech-to-sign",
    originalText: "Thank you for your help",
    language: "bsl",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    duration: 3.8,
  },
  {
    id: "3",
    type: "sign-to-text",
    originalText: "Video recording",
    translatedText: "Nice to meet you",
    language: "asl",
    confidence: 0.94,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: "4",
    type: "text-to-sign",
    originalText: "Good morning everyone",
    language: "rsl",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    duration: 5.1,
  },
  {
    id: "5",
    type: "sign-to-text",
    originalText: "Image upload",
    translatedText: "Have a great day",
    language: "bsl",
    confidence: 0.87,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  },
]

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterLanguage, setFilterLanguage] = useState<string>("all")
  const { toast } = useToast()

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "text-to-sign":
        return <MessageSquare className="h-4 w-4" />
      case "speech-to-sign":
        return <Mic className="h-4 w-4" />
      case "sign-to-text":
        return <Camera className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "text-to-sign":
        return "Text to Sign"
      case "speech-to-sign":
        return "Speech to Sign"
      case "sign-to-text":
        return "Sign to Text"
      default:
        return type
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) {
      return `${minutes} minutes ago`
    } else if (hours < 24) {
      return `${hours} hours ago`
    } else {
      return `${days} days ago`
    }
  }

  const filteredHistory = mockHistory.filter((item) => {
    const matchesSearch =
      item.originalText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.translatedText && item.translatedText.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = filterType === "all" || item.type === filterType
    const matchesLanguage = filterLanguage === "all" || item.language === filterLanguage

    return matchesSearch && matchesType && matchesLanguage
  })

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Text copied",
      description: "Text has been copied to clipboard.",
    })
  }

  const deleteItem = (id: string) => {
    toast({
      title: "Translation deleted",
      description: "The translation has been removed from your history.",
    })
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
            <h1 className="text-xl font-serif font-semibold">Translation History</h1>
            <p className="text-sm text-muted-foreground">View and manage your past translations</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search & Filter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search translations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="text-to-sign">Text to Sign</SelectItem>
                    <SelectItem value="speech-to-sign">Speech to Sign</SelectItem>
                    <SelectItem value="sign-to-text">Sign to Text</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterLanguage} onValueChange={setFilterLanguage}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="asl">ASL</SelectItem>
                    <SelectItem value="bsl">BSL</SelectItem>
                    <SelectItem value="rsl">RSL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* History List */}
          <div className="space-y-4">
            {filteredHistory.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No translations found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery || filterType !== "all" || filterLanguage !== "all"
                      ? "Try adjusting your search or filters"
                      : "Start translating to see your history here"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredHistory.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        {/* Header */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                            {getTypeIcon(item.type)}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{getTypeLabel(item.type)}</Badge>
                            <Badge variant="secondary">{item.language.toUpperCase()}</Badge>
                            {item.confidence && (
                              <Badge variant={item.confidence > 0.9 ? "default" : "secondary"}>
                                {(item.confidence * 100).toFixed(0)}%
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {item.type === "sign-to-text" ? "Source:" : "Original:"}
                            </p>
                            <p className="text-base">{item.originalText}</p>
                          </div>
                          {item.translatedText && (
                            <div>
                              <p className="text-sm text-muted-foreground">Translation:</p>
                              <p className="text-base font-medium">"{item.translatedText}"</p>
                            </div>
                          )}
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{formatTimestamp(item.timestamp)}</span>
                          {item.duration && <span>{item.duration}s duration</span>}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        {item.type !== "sign-to-text" && (
                          <Button variant="ghost" size="icon" aria-label="Play translation">
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyText(item.translatedText || item.originalText)}
                          aria-label="Copy text"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" aria-label="Share translation">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteItem(item.id)}
                          aria-label="Delete translation"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Summary */}
          {filteredHistory.length > 0 && (
            <Card>
              <CardContent className="py-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Showing {filteredHistory.length} translations</span>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All History
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
