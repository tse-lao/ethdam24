


import CustomPieChart from '@/components/chart/custom-pie-chart'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { serverApi } from '@/lib/data/server-api'


export default async function ProjectLanguages({projectId}: {
    projectId: string
}) {
  const {data: projectLanguages} = await serverApi(`/project-sources/${projectId}/languages`)

  return (
    <Card className="">
        <CardHeader>
            Languages
        </CardHeader>
        <CardContent>
          {
            projectLanguages && projectLanguages.length > 0  ? 
            <CustomPieChart data={projectLanguages} />
            : 
            <span>Empty as fuck</span>
          }
        </CardContent>
    </Card>
  )
}
