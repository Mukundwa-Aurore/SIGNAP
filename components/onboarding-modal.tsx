"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MessageSquare, Mic, Camera, ChevronRight, ChevronLeft, Check, Play } from "lucide-react"

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Welcome to Syntok!",
      description: "Your AI-powered sign language translator",
      content: (
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/30 rounded-full flex items-center justify-center mx-auto">
            <MessageSquare className="h-10 w-10 text-accent" />
          </div>
          <p className="text-muted-foreground">
            Syntok bridges communication gaps by translating between text, speech, and sign language. Let's take a quick
            tour to get you started!
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="outline">ASL</Badge>
            <Badge variant="outline">BSL</Badge>
            <Badge variant="outline">RSL</Badge>
          </div>
        </div>
      ),
    },
    {
      title: "Text to Sign Translation",
      description: "Type and see sign language animations",
      content: (
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Type your message</h4>
                <p className="text-sm text-muted-foreground">Enter any text you want to translate</p>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-block bg-card border rounded-lg p-3 mb-2">"Hello, how are you?"</div>
              <div className="text-2xl mb-2">↓</div>
              <div className="text-4xl">👋 🤔 👤</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Perfect for learning sign language or communicating with deaf friends and colleagues.
          </p>
        </div>
      ),
    },
    {
      title: "Speech to Sign Translation",
      description: "Speak naturally and see sign language",
      content: (
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Mic className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Voice Recognition</h4>
                <p className="text-sm text-muted-foreground">Speak and we'll convert to sign language</p>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Listening...</span>
              </div>
              <div className="text-2xl mb-2">🎤 → 👋</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Great for real-time conversations and presentations.
          </p>
        </div>
      ),
    },
    {
      title: "Sign to Text Translation",
      description: "Upload videos or use camera for translation",
      content: (
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Camera className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Video Analysis</h4>
                <p className="text-sm text-muted-foreground">AI recognizes sign language gestures</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-card border rounded-lg p-3 mb-2 text-sm">📹 Video Upload or Live Camera</div>
              <div className="text-2xl mb-2">↓</div>
              <div className="bg-accent/10 rounded p-2 text-sm">"Thank you very much"</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Perfect for understanding sign language when you're learning or need translation help.
          </p>
        </div>
      ),
    },
    {
      title: "You're All Set!",
      description: "Start translating and communicating",
      content: (
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-accent/30 rounded-full flex items-center justify-center mx-auto">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <p className="text-muted-foreground">
            You're ready to start using Syntok! Remember, you can always access settings to customize your experience,
            view your translation history, and adjust accessibility options.
          </p>
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Quick Tips:</h4>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              <li>• Use the settings page to adjust font size and contrast</li>
              <li>• Check your history to review past translations</li>
              <li>• Export translations to share with others</li>
              <li>• Switch between ASL, BSL, and RSL anytime</li>
            </ul>
          </div>
        </div>
      ),
    },
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    localStorage.setItem("syntok-onboarding-completed", "true")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-serif">{steps[currentStep].title}</DialogTitle>
              <DialogDescription className="text-base mt-1">{steps[currentStep].description}</DialogDescription>
            </div>
            <div className="flex items-center gap-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? "bg-accent" : index < currentStep ? "bg-accent/50" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </DialogHeader>

        <div className="py-6">{steps[currentStep].content}</div>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <span className="text-sm text-muted-foreground">
            {currentStep + 1} of {steps.length}
          </span>

          {currentStep === steps.length - 1 ? (
            <Button onClick={handleComplete} className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Start Using Syntok
            </Button>
          ) : (
            <Button onClick={nextStep} className="flex items-center gap-2">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
