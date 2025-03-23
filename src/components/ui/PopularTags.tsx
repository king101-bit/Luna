"use client"

import Link from "next/link"

export const PopularTags = () => {
  const tags = [
    { name: "JavaScript", count: 128 },
    { name: "React", count: 95 },
    { name: "Python", count: 87 },
    { name: "CSS", count: 76 },
    { name: "Node.js", count: 64 },
    { name: "TypeScript", count: 58 },
    { name: "Machine Learning", count: 42 },
    { name: "Algorithms", count: 37 },
    { name: "Career", count: 31 },
    { name: "Frontend", count: 29 },
  ]

  return (
    <div className="rounded-lg p-4 shadow-sm sm:p-6">
      {/* Heading */}
      <h2 className="mb-4 text-lg font-semibold">Popular Tags</h2>

      {/* Tags List */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            href={`/tags/${tag.name.toLowerCase()}`}
            key={tag.name}
            className="rounded-full bg-muted px-3 py-1 text-sm text-black hover:shadow"
          >
            <span>{tag.name}</span>
            <span className="ml-1 text-muted-foreground">({tag.count})</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PopularTags
