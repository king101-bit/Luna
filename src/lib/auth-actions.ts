"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";

// Generic error handler
const handleError = (error: any, message: string = "Error occurred") => {
  console.error(`${message}:`, error); // Log the error to the console
  redirect(`/error?message=${encodeURIComponent(message)}`);
};

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    console.error("Login failed: Email and password are required"); // Log the error
    return handleError(
      new Error("Email and password are required"),
      "Login failed",
    );
  }

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    revalidatePath("/", "layout");
    return redirect("/dashboard");
  } catch (error) {
    console.error("Login failed:", error); // Log the error
    return handleError(error, "Login failed");
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;

  if (!email || !password || !firstName || !lastName) {
    console.error("Signup failed: All fields are required"); // Log the error
    return handleError(new Error("All fields are required"), "Signup failed");
  }

  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: `${firstName} ${lastName}`,
        },
      },
    });

    if (error) throw error;

    revalidatePath("/", "layout");
    return redirect("/dashboard");
  } catch (error) {
    console.error("Signup failed:", error); // Log the error
    return handleError(error, "Signup failed");
  }
}

export async function signout() {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return redirect("/login"); // Redirect to login page after signout
  } catch (error) {
    console.error("Signout failed:", error); // Log the error
    return handleError(error);
  }
}

export async function signInWithGoogle() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) throw error;
    if (!data?.url) throw new Error("No redirect URL provided");

    return redirect(data.url);
  } catch (error) {
    console.error("Google sign-in failed:", error); // Log the error
    return handleError(error, "Google sign-in failed");
  }
}
