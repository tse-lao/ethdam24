import { Badge } from "@/components/ui/badge";

import { addURL, beginEndDates } from "@/lib/utils";
// import Image from "next/image";

import Image from "@/components/ui/image";

import { Card } from "@/components/ui/card";
import Link from "next/link";


interface ProjectDetailItemProps {
  data: any;

}

export default function ProjectDetailItem({
  data,

}: ProjectDetailItemProps) {

  return (
    <Link href={`/project/${data.id}`} >
      <Card className="hover:scale-1.01 p-8 w-full h-full">
        <div className="flex flex-col w-full gap-5">
          <div className="flex justify-between">
          <figure className="relative bg-light w-14 h-14 aspect-square overflow-hidden shrink-0 rounded-[6px] flex justify-center items-center">
            <Image
              src={addURL(data.image)}
              alt="Project Image"
              width={80}
              height={80}
              className="block object-contain"
            />
          </figure>
          <div>
            <Badge variant={"info"} className="mt-2">
              {data.scope}
            </Badge>
          </div>
          </div>

          <div className="flex gap-4 grow">
            <div className="flex flex-col gap-2 grow shrink">
              <header className="flex flex-wrap items-center justify-between gap-3">
                <h5 className="text-sm">{data.name}</h5>
                <div className="break-all text-2sm whitespace-break-spaces h-10 text-ellipse overflow-hidden">
                  <span>{data.description}</span>
                </div>

                {/* <div className="flex items-center gap-3 shrink-0">
              <Badge>{lang?.mypage.project.evaluation} (0)</Badge>
              </div> */}
              </header>
              <div className="flex flex-col flex-wrap gap-5">
                <div className="flex flex-col flex-wrap items-start justify-start gap-4 md:flex-row text-text-secondary">
                  <div className="flex flex-col items-start justify-start gap-2 shrink-0 min-w-[15rem]">
                    <div className="divide-x shrink-0 text-sm">
                      <span className="pr-2 capitalize">
                        {" "}
                       {data?.type}
                      </span>

                      <span className="pl-2 text-sm shrink-0">
                        {beginEndDates(data.begin_date, data.end_date)}
                      </span>
                    </div>
                  </div>
                </div>

          
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
