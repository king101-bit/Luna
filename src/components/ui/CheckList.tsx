import { Card, CardContent, CardHeader, CardTitle } from "./card"

export default function CheckList() {
  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Publishing Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {[
              "Add course title",
              "Add description",
              "Select category",
              "Set difficulty level",
              "Add course content",
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  {index + 1}
                </div>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  )
}
