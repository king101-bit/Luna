export default async function DiscussionPage({
  params,
}: {
  params: { id: string }
}) {
  const discussion = await getDiscussionById(params.id)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{discussion.title}</h1>
        <p className="text-muted-foreground">
          Get advice on career paths, job hunting, and professional development
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Discussion</h2>
        <p className="text-muted-foreground">
          Join the conversation and share your thoughts on this topic.
        </p>
      </div>
    </div>
  )
}
