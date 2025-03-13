"use client";
import React, { useState, FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth-actions";
import Link from "next/link";
import SigninWithGoogleButton from "./SigninWithGoogleButton";
import { Loader2 } from "lucide-react";
import useAuthRedirect from "@/hook/useAuthRedirect";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Explicitly type the data object
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    setIsLoading(true);
    await login(data); // Now `data` matches the expected type
    setIsLoading(false);
  };

  useAuthRedirect();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div
        className={cn(
          "w-full max-w-md flex flex-col gap-6 justify-center items-center",
          className,
        )}
        {...props}
      >
        <Card className="w-full overflow-hidden">
          <CardContent className="grid p-0">
            <form className="p-6 md:p-8" onSubmit={onSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-balance text-muted-foreground">
                    Login to your Luna account
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="johndoe@example.com"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    required
                    placeholder="*********"
                  />
                  <Link
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-8 w-8 animate-spin" />
                  ) : (
                    "Login"
                  )}
                </Button>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <SigninWithGoogleButton />
                </div>

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By clicking login, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
