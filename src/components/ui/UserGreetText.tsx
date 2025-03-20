"use client"

import { User } from "@supabase/supabase-js"
import React from "react"

interface UserGreetTextProps {
  user: User | null
  className?: string // Allow className to be passed as a prop
}

const UserGreetText = ({ user, className = "" }: UserGreetTextProps) => {
  return (
    <h1 className={className}>{user?.user_metadata?.full_name || "Guest"}</h1>
  )
}

export default UserGreetText
