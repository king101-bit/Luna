"use client"

import { User } from "@supabase/supabase-js"
import React from "react"

const UserGreetText = ({ user }: { user: User }) => {
  return (
    <h1 className="ml-2 inline font-bold">
      {user?.user_metadata?.full_name || "Guest"}
    </h1>
  )
}

export default UserGreetText
