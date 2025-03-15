"use client"

import { User } from "@supabase/supabase-js"
import React from "react"

const UserGreetText = ({ user }: { user: User }) => {
  return (
    <h1 className="font-bold inline ml-2">
      {user?.user_metadata?.full_name || "Guest"}
    </h1>
  )
}

export default UserGreetText
