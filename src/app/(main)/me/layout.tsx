
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

import ProfilePageCard from "./_components/profile-page-card";
export default async function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:gap-10 ">
      <Suspense fallback={<span>Loading</span>}>
        <ProfilePageCard  />
      </Suspense>

      <Suspense
        fallback={
          <Skeleton className="h-24 grow shrink animate-pulse bg-background-layer-1" />
        }
      >
        <div className="mx-2 md:mx-10 ">{children}</div>
      </Suspense>
    </div>
  );
}