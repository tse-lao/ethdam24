



import PageHeader from "@/components/ui/page-header";
import { serverApi } from "@/lib/data/server-api";
import ProjectMemberList from "./components/project-member-list";

export default async function ProjectMembers({
  params,
}: {
  params: { id: string; };
}) {
  //getting the user role of the project in order to distinquish, where or not he can add or remove members.
  
  const { data: details } = await serverApi(`/projects/${params.id}`);
  return (
    <div className="flex flex-col gap-md">
      <PageHeader
        title="Project Members"
        subtitle={`These project members have contributed to the project .`}
      ></PageHeader>
      <ProjectMemberList projectId={params.id}  />
    </div>
  );
}
