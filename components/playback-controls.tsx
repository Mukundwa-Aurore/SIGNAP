"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from "lucide-react"

interface PlaybackControlsProps {
  isPlaying: boolean
  currentTime: number
  duration: number
  onPlayPause: () => void
  onSeek: (time: number) => void
  onSpeedChange: (speed: number) => void
  onRestart?: () => void
  speed?: number
}

export function PlaybackControls({
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onSeek,
  onSpeedChange,
  onRestart,
  speed = 1,
}: PlaybackControlsProps) {
  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 1000)
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`
  }

  const handleSliderChange = (value: number[]) => {
    onSeek(value[0])
  }

  return (
    <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
      {/* Progress Bar */}
      <div className="space-y-2">
        <Slider
          value={[currentTime]}
          max={duration}
          step={100}
          onValueChange={handleSliderChange}
          className="w-full"
          aria-label="Playback progress"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-2">
        {onRestart && (
          <Button variant="outline" size="icon" onClick={onRestart} aria-label="Restart">
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}

        <Button variant="outline" size="icon" aria-label="Previous sign">
          <SkipBack className="h-4 w-4" />
        </Button>

        <Button onClick={onPlayPause} size="icon" className="h-12 w-12">
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
        </Button>

        <Button variant="outline" size="icon" aria-label="Next sign">
          <SkipForward className="h-4 w-4" />
        </Button>

        {/* Speed Control */}
        <div className="ml-4">
          <Select value={speed.toString()} onValueChange={(value) => onSpeedChange(Number.parseFloat(value))}>
            <SelectTrigger className="w-20 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.5">0.5x</SelectItem>
              <SelectItem value="0.75">0.75x</SelectItem>
              <SelectItem value="1">1x</SelectItem>
              <SelectItem value="1.25">1.25x</SelectItem>
              <SelectItem value="1.5">1.5x</SelectItem>
              <SelectItem value="2">2x</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
