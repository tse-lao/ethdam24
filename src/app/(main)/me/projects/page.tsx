
// import { serverApi } from "@/lib/data/general";

import { Suspense } from "react";
import ProfileProjects from "./_components/profile-projects";


export default async function UserProjects() {


  return (
    <main className="flex flex-col gap-6">
      <Suspense fallback={"loading projects"}>
        <ProfileProjects   />
      </Suspense>
    </main>
  );
}
