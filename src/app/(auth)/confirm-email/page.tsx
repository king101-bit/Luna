"use client"
import useAuthRedirect from "@/hook/useAuthRedirect"

const ConfirmEmailPage = () => {
  useAuthRedirect()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 text-center">
        {/* SVG Graphic */}
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-24 w-24 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Confirmation Message */}
        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          Please check your email!
        </h1>
        <p className="mb-6 text-gray-600">
          We&apos;ve sent a confirmation link to your email. Click the link to
          verify your account and access all features of our platform.
        </p>
      </div>
    </div>
  )
}

export default ConfirmEmailPage
