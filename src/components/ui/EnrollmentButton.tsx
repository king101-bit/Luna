"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@root/utils/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"

interface EnrollmentButtonProps {
  courseId: string
  coursePrice: number
  userId?: string
  isAuthenticated: boolean
}

export default function EnrollmentButton({
  courseId,
  coursePrice,
  userId,
  isAuthenticated,
}: EnrollmentButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleEnrollment = async () => {
    if (!isAuthenticated) {
      // Redirect to login page
      router.push("/login")
      return
    }

    if (!userId) {
      toast.error("User not found. Please try logging in again.")
      return
    }

    setIsLoading(true)

    try {
      // Check if already enrolled (just in case)
      const { data: existingEnrollment } = await supabase
        .from("enrollments")
        .select("id")
        .eq("user_id", userId)
        .eq("course_id", courseId)
        .single()

      if (existingEnrollment) {
        toast.error("You are already enrolled in this course")
        router.refresh() // Refresh to update the UI
        return
      }

      // For paid courses, you might want to handle payment here
      if (coursePrice > 0) {
        // TODO: Integrate with payment processor (Stripe, PayPal, etc.)
        toast.error("Payment integration not yet implemented")
        return
      }

      // Enroll user
      const { error } = await supabase.from("enrollments").insert({
        user_id: userId,
        course_id: courseId,
        enrolled_at: new Date().toISOString(),
      })

      if (error) {
        console.error("Enrollment error:", error)
        toast.error("Failed to enroll in course. Please try again.")
        return
      }

      toast.success("Successfully enrolled in course!")
      router.refresh() // Refresh to update the UI
    } catch (error) {
      console.error("Enrollment error:", error)
      toast.error("An error occurred during enrollment")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="space-y-2">
        <Button
          onClick={handleEnrollment}
          className="w-full bg-blue-600 hover:bg-blue-700"
          size="lg"
          disabled={isLoading}
        >
          {coursePrice === 0 ? "Enroll Free" : `Enroll for $${coursePrice}`}
        </Button>
        <p className="text-center text-xs text-gray-500">
          You need to login to enroll in this course
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={handleEnrollment}
        className="w-full bg-blue-600 hover:bg-blue-700"
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Enrolling...
          </div>
        ) : coursePrice === 0 ? (
          "Enroll Free"
        ) : (
          `Enroll for $${coursePrice}`
        )}
      </Button>

      {coursePrice > 0 && (
        <p className="text-center text-xs text-gray-500">
          30-day money-back guarantee
        </p>
      )}
    </div>
  )
}
