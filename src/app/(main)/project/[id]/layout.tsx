import React, { Suspense } from "react";
import LayoutProjectDetail from "./_components/layout-project-detail";
import LayoutProjectDetailLoading from "./_components/loading/layout-project-detail-loading";

export default function ProjectDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  //make sure to get the data into a good component
  return (
    <div className="flex flex-col gap-10 mx-2 sm:mx-5 md:mx-10 lg:mx-20">
      <Suspense fallback={<LayoutProjectDetailLoading />}>
        <LayoutProjectDetail projectId={params.id} />
      </Suspense>
      <div className="m-5">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </div>
    </div>
  );
}
