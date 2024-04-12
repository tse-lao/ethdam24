import { Skeleton } from "@/components/ui/skeleton";




import { serverApi } from "@/lib/data/server-api";
import ContributorsCard from "./_components/dashboard/contributors-card";
import ProjectDescription from "./_components/dashboard/project-description";
import ProjectLinks from "./_components/dashboard/project-links";
import ProjectPackages from "./_components/dashboard/project-packages";
import ProjectLanguages from "./_components/project-languages";

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string; };
}) {
  //get the params for checking the profile details page.
  /*   const { data, loading, error } = useFetchData<any>(
    `/project/single/${id}`
  ); */

  const { data } = await serverApi(`/projects/${params.id}`);

  if (!data)
    return (
      <main className="grid gap-6 mx-5 my-12 md:grid-cols-3">
        <section className="flex flex-col gap-8 md:col-span-2">
          <Skeleton className="w-full h-96" />
          <Skeleton className="w-full h-96" />
        </section>

        <section className="flex flex-col col-span-1 gap-8">
          <Skeleton className="h-[25vh] w-[20vw] animate-pulse" />
          <Skeleton className="h-[25vh] w-full animate-pulse" />
        </section>
      </main>
    );

  return (
    <main className="grid w-full gap-6 grid-cols-1 md:grid-cols-3">
      <div className="flex flex-col gap-md">
        <ProjectLinks details={data}  />

        <ContributorsCard projectId={params.id} />
        <ProjectPackages projectId={params.id} />
        {/* <ProjectEvaluation details={data}  /> */}

      </div>

      <div className="md:col-span-2 flex flex-col gap-md">
        <ProjectDescription description={data.description} />

        <ProjectLanguages projectId={params.id} />
      </div>
    </main>
  );
}
