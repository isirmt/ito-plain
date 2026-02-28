import React, { useEffect, useState } from "react"

type AuthState = "loading" | "authorized" | "unauthorized"

export default function RequireAuth({ children }: {
  children: React.ReactNode
}) {
  const [authState, setAuthState] = useState<AuthState>("loading")

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/session", {
          credentials: "same-origin",
          headers: {
            Accept: "application/json"
          }
        })

        if (!response.ok) {
          setAuthState("unauthorized")
          return
        }

        setAuthState("authorized")
      } catch (error) {
        console.log("RequireAuth: session check error", error)
        setAuthState("unauthorized")
      }
    }

    checkSession()
  }, [])

  useEffect(() => {
    if (authState === "unauthorized") {
      window.location.assign("/sign-in")
    }
  }, [authState])

  if (authState !== "authorized") {
    return null
  }

  return <>{children}</>
}
