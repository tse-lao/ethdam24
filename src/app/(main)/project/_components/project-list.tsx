
import { serverApi } from "@/lib/data/server-api";

import ProjectItem from "./project-item";


export default async function ProjectList({

  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const newUrl = new URLSearchParams();

  // Loop through searchParams and set them in newUrl
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      const paramName = key === "search" ? "name" : key;
      newUrl.set(paramName, value);
    }
  });

  const {data: projects} = await serverApi(`/projects`, newUrl.toString());

  

  return (
    <div className="flex flex-col gap-10">
      <section className="grid w-full gap-10 truncate sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-4">
        {projects.data.length > 0 &&
          projects.data.map((item: any) => (
            <ProjectItem key={item.id} details={item} />
          ))}
      </section>

{/*       <Pagination
        total={projects.totalCount}
        limit={searchParams.limit ? parseInt(searchParams.limit) : 20}
        page={searchParams.page ? parseInt(searchParams.page) : 1}
      /> */}
    </div>
  );
}