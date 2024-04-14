import { ProjectMatch } from "../feed/create-feed";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export default function SimilarityDialog({
  projectMatch,
}: {
  projectMatch: ProjectMatch;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <Badge variant="success" className="text-center">
          {(projectMatch?.similarity_score
            ? projectMatch.similarity_score
            : Math.random() * 100
          ).toFixed(2)}
        </Badge>
      </DialogTrigger>
      <DialogContent>{JSON.stringify(projectMatch, null, 2)}</DialogContent>
    </Dialog>
  );
}
