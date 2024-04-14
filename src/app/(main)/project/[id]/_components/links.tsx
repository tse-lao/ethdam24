import { Icon } from "detechies-icons";
import { File } from "lucide-react";
import Link from "next/link";

const Links = ({ works }: { works: any[] }) => {
  if (!works) return <></>;
  return (
    <div className="flex flex-col">
      {works &&
        works.map((work, index) => {
          if (work.type === "file") {
            return (
              <Link
                key={index}
                href={`https://ipfs.io/ipfs/` + work.link}
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                <div className="flex items-center gap-4 py-4 overflow-auto border-b-2 border-border-div hover:text-text-secondary">
                  <div className="flex items-center justify-center p-2 rounded-full w-9 h-9 bg-background-layer-2">
                    <File className="text-text-primary" />
                  </div>

                  <div className="overflow-auto truncate text-title_s">
                    {work.name}
                  </div>
                </div>
              </Link>
            );
          }
          const site = getSiteFromLink(work.link);
          return (
            <Link
              key={index}
              className="flex items-center gap-4 py-3 overflow-auto text-gray-700 hover:text-gray-900"
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon fontSize="16" />

              <span className="truncate text-label_s">{work.link}</span>
            </Link>
          );
        })}
    </div>
  );
};

const getSiteFromLink = (link: string): string => {
  if (link.includes("github.com")) return "github";
  if (link.includes("dribbble.com")) return "dribbble";
  if (link.includes("figma.com")) return "figma";
  if (link.includes("google.com")) return "google";
  if (link.includes("ipfs.io")) return "ipfs";
  return "unknown";
};

export default Links;
