



import PageHeader from "@/components/ui/page-header";
import ProjectMemberList from "./components/project-member-list";

export default async function ProjectMembers({
  params,
}: {
  params: { id: string; };
}) {
  //getting the user role of the project in order to distinquish, where or not he can add or remove members.
  
  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        title="Project Members"
        subtitle={`These project members have contributed to the project .`}
        />
      <ProjectMemberList projectId={params.id}  />
    </div>
  );
}
