import Link from "next/link"
import { Avatar } from "./avatar"
import BoringAvatar from "boring-avatars"

export const ActiveMembers = () => {
  const members = [
    { name: "Jane Smith", title: "Product Manager" },
    { name: "Samantha Lee", title: "UX Designer" },
    { name: "Michael Brown", title: "Frontend Developer" },
    { name: "Emily Johnson", title: "Backend Developer" },
  ]

  return (
    <div className="rounded-lg p-4 shadow-sm sm:p-6">
      {/* Heading */}
      <h2 className="mb-4 text-lg font-semibold">Active Members</h2>

      {/* Members List */}
      <div className="space-y-3 sm:space-y-4">
        {members.map((member) => (
          <Link
            key={member.name}
            href={`/profile/${member.name}`}
            className="-mx-2 flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-muted"
          >
            {/* Avatar */}
            <Avatar>
              <BoringAvatar
                name={member.name}
                size={40}
                variant="marble" // Options: "marble", "beam", "pixel", "sunset", "ring", "bauhaus"
                colors={["#FF6B6B", "#F7FFF7", "#A8E6CF", "#4ECDC4", "#1A535C"]}
                alt={member.name}
              />
            </Avatar>

            {/* Member Details */}
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{member.name}</p>
              <p className="truncate text-sm text-muted-foreground">
                {member.title}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Members Link */}
      <div className="mt-4 text-center">
        <Link
          href="/community/members"
          className="text-sm text-primary hover:underline"
        >
          View all members
        </Link>
      </div>
    </div>
  )
}

export default ActiveMembers
