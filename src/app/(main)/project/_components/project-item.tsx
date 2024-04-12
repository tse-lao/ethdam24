import { Badge } from "@/components/ui/badge";
// import Image from "next/image";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
export default function ProjectItem({ details }: { details: any }) {
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Link href={`/project/${details.id}`}>
      <Card className="flex flex-col items-start w-full p-[30px] gap-md hover:scale-[0.98] transition-transform duration-200">
        <div className="flex flex-row justify-between items-center gap-3 w-full ">
          <figure className="overflow-hidden shrink-0 relative object-scale-down w-[50px] h-[50px] rounded-sm aspect-square flex justify-center items-center bg-background-layer-2">
            <Image
              src={`https://ipfs.io/ipfs/${details.image}`}
              alt={`Project ${details.name}`}
              width={30}
              height={30}
            />
          </figure>
          <div>{details.scope && <Badge>{details.scopre}</Badge>}</div>
        </div>

        <div className="flex flex-col gap-2.5">
          <h5 className="text-title_m text-text-primary">{details.name}</h5>
          <span
            className="h-[64px] overflow-auto block w-full text-text-secondary text-body_s whitespace-normal"
            dangerouslySetInnerHTML={{
              __html: details.description
                ? details.description
                : "No introduction yet.",
            }}
          ></span>
        </div>

        <div className="flex overflow-scroll gap-3 justify-self-end">
          {details.tags &&
            details.tags?.map((tag: any) => (
              <Badge
                key={tag}
                className="text-label_s rounded-sm"
              >
                {tag}
              </Badge>
            ))}

          {!details.tags && (
            <Badge
              className="text-label_s rounded-sm"
            >
              No Category
            </Badge>
          )}
        </div>
      </Card>
    </Link>
  );
}
