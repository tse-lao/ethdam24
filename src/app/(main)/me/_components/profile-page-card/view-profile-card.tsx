import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { addURL } from "@/lib/utils";
import { Briefcase, Clock, Wallet } from "lucide-react";

export default function ViewProfileCard({ dictionary, profile }: any) {
  return (
    <div className="flex flex-col gap-10">
      <header className="w-full py-10 gap-2 justify-center text-center bg-center bg-[url('/images/header-hex.png')]  ">
        <div className="flex flex-col gap-3.5 mx-auto">
          <div className="mx-auto">
            <Avatar>
              <AvatarImage src={addURL(profile.avatar_link)} />
            </Avatar>
          </div>

          <div>
            <h1 className="text-lg tracking-tighter font-semibold text-text-primary">
              {profile.display_name}
            </h1>
          </div>
          <div className="flex gap-[18px] text-text-secondary mx-auto">
            {profile.profile_details?.hourly_rate && (
              <div className="flex gap-[5px] justify-center items-center">
                <Wallet color="#6B7684" fontSize={16} />
                <span className="text-b-14-14-500">
                  {profile.profile_details?.hourly_rate}
                </span>
              </div>
            )}
            {profile.profile_details?.timezone && (
              <div className="flex gap-[5px] justify-center items-center pl-3">
                <Clock fontSize={16} color="#6B7684 " />
                <span className="text-b-14-14-500">
                  {profile.profile_details.timezone}
                </span>
              </div>
            )}
            {profile.profile_details?.availability && (
              <div className="flex gap-[5px] justify-center items-center pl-3 text-text-secondary">
                <Briefcase size={16} color="#6B7684" />
                <span className="text-b-14-14-500">
                  {profile.profile_details?.availability}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}