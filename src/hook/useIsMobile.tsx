import React from "react"

export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // Prevents hydration mismatch by checking only in client
    const checkIsMobile = () => window.innerWidth < breakpoint

    setIsMobile(checkIsMobile()) // set on mount
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [breakpoint])

  return isMobile
}
