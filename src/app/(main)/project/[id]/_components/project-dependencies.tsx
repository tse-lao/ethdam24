
import GithubDependencies from "@/components/github/github-dependencies";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ProjectDependencies({ id }: { id: string }) {
  //what i want to do here is make sure that i can easily select the dependencies that i want to use in the project.
  return (
    <Card>
      <CardHeader className="flex flex-wrap items-center justify-between">
        <h5>Dependencies</h5>
      </CardHeader>
      <CardContent>
        <GithubDependencies projectId={id} />
      </CardContent>
    </Card>
  );
}
