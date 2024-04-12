
import { DependenciesList } from "@/components/github/dependencies-list";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { serverApi } from "@/lib/data/server-api";


export default async function ProjectPackages({
  projectId,
}: {
  projectId: string;
}) {
  //fix here how we going to retreive teh pacakges
  const { data: packages } = await serverApi(`/project-sources/${projectId}/packages`);

  return (
    <Card className="">
      <CardHeader>Packages</CardHeader>
      <CardContent>
        {packages && packages.length > 0 ? (
          <DependenciesList dependencies={packages} />
        ) : (
         <span>No packages imported</span>
        )}
      </CardContent>
    </Card>
  );
}
