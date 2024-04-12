import { Card, CardContent, CardHeader } from "@/components/ui/card"



export default function ProjectDescription({
    description
}: {
    description: string
}) {
  return (
    <Card>
        <CardHeader>
            Project Description
        </CardHeader>
        <CardContent className="text-sm flex-wrap leading-6">
            {description ? description : "No description available"}
        </CardContent>
    </Card>
  )
}
