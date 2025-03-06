"use client";
import { createBrowserClient } from "@supabase/ssr";
import React, { useEffect, useState } from "react";

const UserGreetText = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const fetchUser = async () => {
      try {
        // 1. Remove optional chaining
        const result = await supabase.auth.getUser();

        // 2. Check for undefined first
        if (!result.data) {
          console.error("No user data found");
          return;
        }

        // 3. Safe destructuring
        const { user } = result.data;
        setUser(user);
      } catch (error) {
        console.error("Auth error:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <h1 className="font-bold inline ml-2">
      {user?.user_metadata?.full_name || "Guest"}
    </h1>
  );
};

export default UserGreetText;
