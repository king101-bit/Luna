import Link from "next/link"

interface Discussion {
  id: string
  title: string
  reply_count: number
}

interface RelatedDiscussionsProps {
  discussions: Discussion[]
}

export default function RelatedDiscussions({
  discussions,
}: RelatedDiscussionsProps) {
  return (
    <div className="rounded-lg bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Related Discussions</h3>

      {discussions.length > 0 ? (
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <Link
              key={discussion.id}
              href={`/community/discussion/${discussion.id}`}
              className="line-clamp-2 block font-medium hover:underline"
            >
              {discussion.title}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No related discussions found
        </p>
      )}
    </div>
  )
}
