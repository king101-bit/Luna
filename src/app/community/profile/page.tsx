"use client"
import { MainNavbar } from "@/components/ui/MainNavbar"
import { ProfileHeader } from "@/components/ui/ProfileHeader"
import ProfileSkeleton from "@/components/ui/ProfileSkeleton"
import ProfileStats from "@/components/ui/ProfileStats"
import { ProfileTabs } from "@/components/ui/ProfileTabs"

import { Suspense } from "react"

export default function Profile() {
  return (
    <>
      <MainNavbar />
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileHeader />
          <ProfileStats />
          <ProfileTabs />
        </Suspense>
      </div>
    </>
  )
}
