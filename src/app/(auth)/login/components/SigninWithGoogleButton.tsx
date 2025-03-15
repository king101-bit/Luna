"use client"
import React from "react"
import { signInWithGoogle } from "@/lib/auth-actions"
import { Button } from "@/components/ui/button"
import { GoogleIcon } from "@/components/ui/GoogleIcon"
const SigninWithGoogleButton = () => {
  return (
    <Button
      type="button"
      variant="outline" // Use the "outline" variant for a clean look
      className="w-48 flex items-center justify-center gap-2 px-4 py-4 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
      onClick={() => {
        signInWithGoogle()
      }}
    >
      <GoogleIcon className="h-4 w-4" /> {/* Your Google icon */}
      <span>Sign in with Google</span>
    </Button>
  )
}

export default SigninWithGoogleButton
