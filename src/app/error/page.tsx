"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Error() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center">
      {/* SVG Image */}
      <Image
        src="/error.svg"
        width={300}
        height={300}
        alt="Error Image"
        className="mb-6"
      />

      {/* Error Text */}
      <h1 className="text-4xl font-bold text-red-600">
        Oops! Something went wrong
      </h1>
      <p className="mt-2 text-gray-500">
        An unexpected error occurred. Please try again later.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <Button variant="outline" onClick={() => router.push("/dashboard")}>
          Go Home
        </Button>
        <Button variant="default" onClick={() => router.refresh()}>
          Retry
        </Button>
      </div>
    </div>
  )
}
