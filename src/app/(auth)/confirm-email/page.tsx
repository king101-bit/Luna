"use client"
import useAuthRedirect from "@/hook/useAuthRedirect"

const ConfirmEmailPage = () => {
  useAuthRedirect()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full p-8 text-center">
        {/* SVG Graphic */}
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mx-auto text-blue-500"
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
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Please check your email!
        </h1>
        <p className="text-gray-600 mb-6">
          We&apos;ve sent a confirmation link to your email. Click the link to
          verify your account and access all features of our platform.
        </p>
      </div>
    </div>
  )
}

export default ConfirmEmailPage
