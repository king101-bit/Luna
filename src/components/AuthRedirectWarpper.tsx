"use client" // Ensure this is a Client Component

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useUserStore from "@/stores/UserStore" // Adjust the import path

interface AuthRedirectWrapperProps {
  children: React.ReactNode
  redirectPath?: string
}

const AuthRedirectWrapper = ({
  children,
  redirectPath = "/dashboard",
}: AuthRedirectWrapperProps) => {
  const router = useRouter()
  const { user, loading } = useUserStore()
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    console.log("From Wrapper", user)
    // Redirect if the user is authenticated and not loading
    if (!loading && user) {
      console.log("Redirecting to dashboard")
      router.replace(redirectPath)
    } else if (!loading) {
      // If not authenticated and not loading, allow the page to render
      setIsCheckingAuth(false)
    }
  }, [user, loading, router, redirectPath])

  // Show a loading spinner or nothing while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  // Render the children (the page content) only after authentication check is complete
  return <>{children}</>
}

export default AuthRedirectWrapper
