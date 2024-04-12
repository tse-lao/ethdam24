// import { serverApi } from "@/lib/data/general";

import { Suspense } from "react";
import UserDashboard from "./_components/dashboard/dashboard";

export default async function MyDashboard() {

  return (
    <main className="flex flex-col ">
      <Suspense fallback={"loading projects"}>
        <UserDashboard address="me"/>
      </Suspense>
    </main>
  );
}
