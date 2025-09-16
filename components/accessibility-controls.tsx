"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"

export function AccessibilityControls() {
  const { theme, setTheme } = useTheme()
  const [fontSize, setFontSize] = useState("medium")
  const [highContrast, setHighContrast] = useState(false)
  const [voiceGuidance, setVoiceGuidance] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load saved preferences
    const savedFontSize = localStorage.getItem("syntok-font-size") || "medium"
    const savedHighContrast = localStorage.getItem("syntok-high-contrast") === "true"
    const savedVoiceGuidance = localStorage.getItem("syntok-voice-guidance") === "true"

    setFontSize(savedFontSize)
    setHighContrast(savedHighContrast)
    setVoiceGuidance(savedVoiceGuidance)

    // Apply font size to document
    document.documentElement.setAttribute("data-font-size", savedFontSize)
    if (savedHighContrast) {
      document.documentElement.classList.add("high-contrast")
    }
  }, [])

  const handleFontSizeChange = (newSize: string) => {
    setFontSize(newSize)
    localStorage.setItem("syntok-font-size", newSize)
    document.documentElement.setAttribute("data-font-size", newSize)
  }

  const handleHighContrastChange = (enabled: boolean) => {
    setHighContrast(enabled)
    localStorage.setItem("syntok-high-contrast", enabled.toString())
    if (enabled) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }

  const handleVoiceGuidanceChange = (enabled: boolean) => {
    setVoiceGuidance(enabled)
    localStorage.setItem("syntok-voice-guidance", enabled.toString())
  }

  if (!mounted) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">Accessibility Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="theme-select">Theme</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger id="theme-select">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="font-size-select">Font Size</Label>
          <Select value={fontSize} onValueChange={handleFontSizeChange}>
            <SelectTrigger id="font-size-select">
              <SelectValue placeholder="Select font size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
              <SelectItem value="extra-large">Extra Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="high-contrast">High Contrast Mode</Label>
          <Switch id="high-contrast" checked={highContrast} onCheckedChange={handleHighContrastChange} />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="voice-guidance" className="flex items-center gap-2">
            {voiceGuidance ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            Voice Guidance
          </Label>
          <Switch id="voice-guidance" checked={voiceGuidance} onCheckedChange={handleVoiceGuidanceChange} />
        </div>
      </CardContent>
    </Card>
  )
}
