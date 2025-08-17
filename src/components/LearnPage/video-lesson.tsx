"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Clock,
  Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lesson } from "@root/global"

interface VideoLessonViewerProps {
  lesson: Lesson
}

export default function VideoLessonViewer({ lesson }: VideoLessonViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Format seconds into mm:ss
  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }, [])

  // Play/pause toggle (don't update state directly here — listen to video events)
  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) video.pause()
    else video.play()
  }

  // Mute toggle
  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  // Volume change handler
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    const video = videoRef.current
    if (!video) return
    video.volume = newVolume
    video.muted = newVolume === 0
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  // Seek video
  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = value[0]
    setCurrentTime(value[0])
  }

  // Fullscreen toggle
  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (!document.fullscreenElement) {
      container
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(console.error)
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(console.error)
    }
  }

  // Show/hide controls after inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout

    const resetTimeout = () => {
      setShowControls(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        if (isPlaying) setShowControls(false)
      }, 3000)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", resetTimeout)
      container.addEventListener("mouseenter", resetTimeout)
      container.addEventListener(
        "mouseleave",
        () => isPlaying && setShowControls(false)
      )
      container.addEventListener("touchstart", resetTimeout)
    }

    resetTimeout()

    return () => {
      clearTimeout(timeout)
      if (container) {
        container.removeEventListener("mousemove", resetTimeout)
        container.removeEventListener("mouseenter", resetTimeout)
        container.removeEventListener(
          "mouseleave",
          () => isPlaying && setShowControls(false)
        )
        container.removeEventListener("touchstart", resetTimeout)
      }
    }
  }, [isPlaying])

  // Listen for video events to sync state
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration || 0)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)
    video.addEventListener("play", onPlay)
    video.addEventListener("pause", onPause)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
      video.removeEventListener("play", onPlay)
      video.removeEventListener("pause", onPause)
    }
  }, [])

  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Video className="mr-2 h-6 w-6 text-blue-500" />
              {lesson.title}
            </CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {formatTime(duration)}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div
            ref={containerRef}
            className="relative mb-4 flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-black"
          >
            {lesson.video_url ? (
              <video
                ref={videoRef}
                src={lesson.video_url}
                className="h-full w-full rounded-lg"
                onClick={togglePlay}
                playsInline
                preload="metadata"
              />
            ) : (
              <div className="flex flex-col items-center text-white">
                <Play className="mb-4 h-16 w-16" />
                <p>Video content will be available here</p>
              </div>
            )}

            {/* Controls overlay */}
            <div
              className={cn(
                "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity",
                showControls ? "opacity-100" : "opacity-0"
              )}
            >
              {/* Progress slider */}
              <Slider
                value={[currentTime]}
                max={duration || 0}
                step={0.1}
                onValueChange={handleSeek}
                className="mb-2 h-1"
              />

              {/* Control buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>

                  <div className="flex w-32 items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={toggleMute}
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </Button>

                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={1}
                      step={0.01}
                      onValueChange={handleVolumeChange}
                      className="h-1 w-20"
                      aria-label="Volume"
                    />
                  </div>

                  <span
                    className="select-none text-xs text-white"
                    aria-live="polite"
                  >
                    {formatTime(currentTime)} / {formatTime(duration || 0)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    aria-label="Settings"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={toggleFullscreen}
                    aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                  >
                    <Maximize className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About this video</h3>
            <p className="text-muted-foreground">
              {lesson.description || "No description provided."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
