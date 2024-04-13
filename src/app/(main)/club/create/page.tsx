

import { Card } from "@/components/ui/card";
import { CreateTeamForm } from "./_component/create-team-form";

export default async function CreateTeamPage() {
  // const text = dictionary?.group?.create;
  return (
    // Temporarily insert fixed values ​​(to work with grid later)
    <main className="w-full max-w-[60rem] mx-auto">
      <Card className="gap-0 py-10 px-14">
        <header className="flex flex-col mb-10">
          <h4 className="mb-3 text-heading_s">
            Create a club
          </h4>

          <span className="mb-1 text-body_s text-state-error">
            * these fields are required
          </span>

          <span className="text-label_s text-text-secondary ">
            Create a club to start funding your projects and ideas.
          </span>
        </header>

        <CreateTeamForm />
      </Card>
    </main>
  );
}
