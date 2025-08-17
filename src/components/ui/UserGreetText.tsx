"use client"
import { createClient } from "@root/utils/supabase/client"
import { useEffect, useState } from "react"

const UserGreetText = ({
  user,
  className = "",
}: {
  user: any
  className?: string
}) => {
  const [name, setName] = useState(user?.user_metadata?.full_name || "Guest")
  const supabase = createClient()

  useEffect(() => {
    if (!user?.id || name !== "Guest") return

    const fetchName = async () => {
      const { data } = await supabase
        .from("users")
        .select("name")
        .eq("id", user.id)
        .single()
      if (data?.name) setName(data.name)
    }
    fetchName()
  }, [user?.id])

  return <span className={className}>{name}</span>
}

export default UserGreetText
