"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface LanguageSelectorProps {
  value: string
  onValueChange: (value: string) => void
  label?: string
  className?: string
}

const SIGN_LANGUAGES = [
  { value: "asl", label: "American Sign Language (ASL)" },
  { value: "bsl", label: "British Sign Language (BSL)" },
  { value: "rsl", label: "Rwandan Sign Language (RSL)" },
]

export function LanguageSelector({ value, onValueChange, label = "Sign Language", className }: LanguageSelectorProps) {
  return (
    <div className={className}>
      <Label htmlFor="language-select" className="text-sm font-medium">
        {label}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id="language-select" className="mt-1">
          <SelectValue placeholder="Select a sign language" />
        </SelectTrigger>
        <SelectContent>
          {SIGN_LANGUAGES.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
