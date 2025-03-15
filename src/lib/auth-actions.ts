"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "../../utils/supabase/server"

// Generic error handler
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (error: any, message: string = "Error occurred") => {
  console.error(`${message}:`, error) // Log the error to the console
  redirect(`/error?message=${encodeURIComponent(message)}`)
}

export async function login({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const supabase = await createClient()

  if (!email || !password) {
    console.error("Login failed: Email and password are required") // Log the error
    // return handleError(
    // new Error("Email and password are required"),
    //  "Login failed",
    //   );
  }

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error?.code === "AUTH_INVALID_EMAIL_PASSWORD_COMBINATION") {
    console.error("Login failed: Invalid email or password") // Log the error
    return handleError(new Error("Invalid email or password"), "Login failed")
  }
  if (error?.code === "AUTH_USER_NOT_FOUND") {
    console.error("Login failed: User not found") // Log the error
    return handleError(new Error("User not found"), "Login failed")
  }
  if (error?.code === "email_not_confirmed") {
    console.error("Login failed: Email not confirmed") // Log the error
    redirect("/confirm-email")
  } else if (error) {
    console.error("Login failed:", error.message) // Log the error
    return handleError(error, "Login failed")
  }
  console.log(data)
  revalidatePath("/", "layout")
  redirect("/dashboard")
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const firstName = formData.get("first-name") as string
  const lastName = formData.get("last-name") as string

  if (!email || !password || !firstName || !lastName) {
    console.error("Signup failed: All fields are required") // Log the error
    return handleError(new Error("All fields are required"), "Signup failed")
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: `${firstName} ${lastName}`,
      },
    },
  })

  if (error) throw error

  revalidatePath("/", "layout")
  redirect("/confirm-email")
}

export async function signout() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()
  if (error) throw error
  redirect("/login") // Redirect to login page after signout
}

export async function signInWithGoogle() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  })

  if (error) {
    throw error
  } else {
    if (!data?.url) throw new Error("No redirect URL provided")

    redirect(data.url)
    // redirect("/dashboard");
  }
}
