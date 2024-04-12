import { Suspense } from "react";



import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header";
import Link from "next/link";

import ProjectList from "./_components/project-list";

export default async function ProjectListPage({
  searchParams,
  
  
}: {
  searchParams: { [key: string]: string | undefined };
}) {

  return (
    <main className="flex flex-col gap-10 m-2 md:m-10 ">
      <PageHeader title="Projects" subtitle="Search for your projects here">
        <Link href={`/project/create`} passHref>
          <Button className="btn btn-primary">Add Project</Button>
        </Link>
        </PageHeader>
      <Suspense fallback={<span>Loading..</span>}>
        <ProjectList  searchParams={searchParams} />
      </Suspense>
    </main>
  );
}