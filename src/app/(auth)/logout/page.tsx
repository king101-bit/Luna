"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LogOut, CheckCircle } from "lucide-react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const LogoutPage = () => {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const redirectTime = 2000 // 2 seconds
  const updateInterval = 50 // Update progress every 50ms

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      router.push("/dashboard")
    }, redirectTime)

    // Update progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (updateInterval / redirectTime) * 100
        return newProgress > 100 ? 100 : newProgress
      })
    }, updateInterval)

    return () => {
      clearTimeout(redirectTimeout)
      clearInterval(progressInterval)
    }
  }, [router])

  const handleManualRedirect = () => {
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-2 pb-2 text-center">
          <div className="rounded-full bg-primary/10 p-3">
            <LogOut className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Logged Out Successfully
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pb-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <CheckCircle className="h-5 w-5 text-primary" />
            <p>You have been securely logged out of your account</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Redirecting to dashboard in a moment...
            </p>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleManualRedirect} className="w-full">
            Return to Dashboard Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LogoutPage
