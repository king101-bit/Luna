export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Replace spaces with -
    .trim() // Trim whitespace
}
