import { Card, CardContent } from "@/components/ui/card";
import { addURL } from "@/lib/utils";
import { Briefcase, PercentDiamond } from "lucide-react";
import Image from "next/image";

export interface detailsProps {
  details: any;
}
export default async function ProjectMemberListItem({ details }: detailsProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-5 justify-center grow">
        <div className="flex flex-col gap-4 mx-auto">
          <Image
            src={addURL(details.user.avatar_link)}
            width={100}
            height={100}
            className="rounded-full bg-accent-secondary mx-auto border border-accent-primary"
            alt="profile_image_project_member "
          />
          <h3 className="text-center font-medium">
            {details.user.display_name}
          </h3>
          {details.works[0] ? (
            <div className="flex flex-row flex-wrap gap-4 text-sm text-text-secondary">
              <div className="flex flex-row gap-2 items-center justify-center">
                <Briefcase size={16} />
                <span>{details.works[0].role}</span>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <PercentDiamond size={16} />
                <span>{details.works[0].percentage} % contribution</span>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-row gap-2 items-center text-sm text-text-secondary">
                <Briefcase size={16} />
                <span>{details.role}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
