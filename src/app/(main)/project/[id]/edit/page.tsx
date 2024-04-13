
import { Card, CardContent, CardHeader } from "@/components/ui/card";


import { serverApi } from "@/lib/data/server-api";
import DeleteProject from "./_components/delete-project";
import EditProjectSource from "./_components/edit-project-source";
import ProjectEditForm from "./_components/project-edit-form";
export default async function ProjectEditPage({ params }: { params: any }) {
  //first get the whole project form.

  const {data: projectData} = await serverApi(`/projects/${params.id}`);

  return (
    <main className="w-full mx-auto flex flex-col gap-md">
      <Card id="project-settings">
        <CardHeader>
          <h4>
            Edit Project
          </h4>
        </CardHeader>
        <CardContent>
        <ProjectEditForm defaultValues={projectData} />
        </CardContent>
      </Card>
    
      <EditProjectSource projectId={params.id}/>
      <Card>
        <CardHeader>
          <h4>
            Project Deletion
          </h4>
        </CardHeader>
        <CardContent>
          <DeleteProject projectData={projectData} />
        </CardContent>
      </Card>
    </main>
  );
}
