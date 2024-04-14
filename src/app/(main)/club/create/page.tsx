

import { Card } from "@/components/ui/card";
import PageHeader from "@/components/ui/page-header";
import { CreateTeamForm } from "./_component/create-team-form";

export default async function CreateTeamPage() {
  // const text = dictionary?.group?.create;
  return (
    // Temporarily insert fixed values ​​(to work with grid later)
    <main className="w-full max-w-[60rem] mx-auto">
      <Card className="gap-0 py-10 px-14">
        <PageHeader title="Create a club" subtitle="Create a club to start funding your projects and ideas." />

        <CreateTeamForm />
      </Card>
    </main>
  );
}
