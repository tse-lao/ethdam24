
import { PlusIcon } from "lucide-react";
// import Image from "next/image";

import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header";
import { serverApi } from "@/lib/data/server-api";
import Link from "next/link";
import ProjectDetailItem from "./project-detail-item";


export default async function ProfileProjects({
  user,

}: {
  user?: string
}) {
  const newUrl = new URLSearchParams();
  newUrl.set("me", "true");
  
  if(user) {
    newUrl.set("wallet", user);
    newUrl.delete("me");
  }
  const { data: projects } = await serverApi(`/projects`, newUrl.toString());
  
  return (
    <div className="flex flex-col gap-3">
      <PageHeader title={`Projects (${projects.totalCount})`}>
        {!user && (
          <Link href="/project/create" className="flex flex-row">
            <Button variant={"secondary"} size="sm">
              <PlusIcon size="16" className="text-text-secondary" /> <span>New Project </span>
            </Button>
          </Link>
        )}
      </PageHeader>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
      {projects.data &&
        projects.data.map((project: any, index: number) => (
            <ProjectDetailItem
              data={project}
              key={index}
            />
          ))}
          </div>
    </div>
    
  );
}
