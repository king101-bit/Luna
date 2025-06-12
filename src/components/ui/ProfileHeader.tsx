"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UserAvatar } from "@/components/ui/UserAvatar"
import useUserStore from "@/stores/UserStore"
import {
  Calendar,
  Github,
  Globe,
  Linkedin,
  MapPin,
  MessageSquare,
  Twitter,
  UserCheck,
  UserPlus,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export const ProfileHeader = () => {
  const { user } = useUserStore()
  const [isFollowing, setIsFollowing] = useState(false)
  const socialLinks = {
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username",
    twitter: "https://twitter.com/username",
    website: "https://personal-website.com",
  }
  const location = "San Francisco, CA"

  function formatTimeAgo(date: Date, locale = "en") {
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    const intervals: [number, Intl.RelativeTimeFormatUnit][] = [
      [60, "second"],
      [60 * 60, "minute"],
      [60 * 60 * 24, "hour"],
      [60 * 60 * 24 * 30, "day"],
      [60 * 60 * 24 * 365, "month"],
      [Infinity, "year"],
    ]

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" })

    for (let i = 0; i < intervals.length; i++) {
      const [threshold, unit] = intervals[i]
      const prevThreshold = i > 0 ? intervals[i - 1][0] : 1

      if (seconds < threshold) {
        const value = Math.floor(seconds / prevThreshold)
        return rtf.format(-value, unit)
      }
    }
  }

  const joinDate = new Date(2022, 5, 15)
  const formatted = formatTimeAgo(joinDate, "en")

  return (
    <>
      <Card className="mb-8 overflow-hidden border shadow-md">
        <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
          <Image
            src="/jero"
            alt="Profile Cover"
            fill
            className="object-cover"
          />
        </div>

        <CardContent className="relative px-6 pb-6 pt-0">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="-mt-12">
              <UserAvatar
                name={user?.user_metadata?.name || "User"}
                imageUrl={user?.user_metadata?.avatar_url}
                size={100}
                className="rounded-full border-4 border-white shadow-md"
              />
            </div>

            <div className="flex-1 space-y-3 pt-2">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <h1 className="text-2xl font-bold">Zack</h1>
                  <p className="text-muted-foreground">
                    @{user?.user_metadata?.name || "User"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={isFollowing ? "outline" : "default"}
                    size="sm"
                    onClick={() => setIsFollowing(!isFollowing)}
                    className="flex items-center gap-1 transition duration-150 hover:scale-[1.03] hover:shadow-md"
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="h-4 w-4" />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4" />
                        Follow
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex items-center gap-1 transition duration-150 hover:scale-[1.03] hover:shadow-md"
                  >
                    <Link href={`/community/messages/`}>
                      <MessageSquare className="h-4 w-4" />
                      Message
                    </Link>
                  </Button>
                </div>
              </div>
              <div>
                <Badge variant="secondary" className="text-sm font-normal">
                  Full stack developer
                </Badge>
              </div>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptatibus repudiandae soluta iusto itaque voluptate veritatis
                exercitationem eaque iste illum enim debitis voluptas maiores
                nesciunt suscipit expedita totam sit, sint cum?
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-sm text-muted-foreground">
                {location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{`Joined ${formatted}`}</span>
                </div>
                {socialLinks.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {socialLinks.website && (
                  <a
                    href={socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                )}
              </div>

              <div className="flex gap-6 pt-2 text-sm font-medium text-muted-foreground">
                <div className="flex flex-col items-center">
                  <span>Followers</span>
                  <span className="text-base text-white">200 K</span>
                </div>
                <div className="flex flex-col items-center">
                  <span>Following</span>
                  <span className="text-base text-white">150</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
