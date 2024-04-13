import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { addURL } from "@/lib/utils";
import { Abstract41, Geolocation, Sms } from "detechies-icons";

export default function ViewProfileCard({ dictionary, profile }: any) {
  return (
    <div className="flex flex-col gap-10">
      <header className="w-full py-10 gap-2 justify-center text-center bg-center bg-[url('/images/header-hex.png')]  ">
        <div className="flex flex-col gap-3.5 mx-auto">
          <div className="mx-auto">
            <Avatar className="w-[100px] h-[100px] border-2 border-success">
              <AvatarImage src={addURL(profile.avatar_link)}/>
            </Avatar>
          </div>

          <div>
            <h1 className="text-lg tracking-tighter">
              {profile.display_name}
            </h1>
          </div>
          <div className="flex gap-[18px] text-gray-600 mx-auto">
            {profile.profile_details?.hourly_rate && (
              <div className="flex gap-[5px] justify-center items-center">
                <Abstract41 color="#6B7684" fontSize={16} />
                <span className="text-base">
                  {profile.profile_details?.hourly_rate}
                </span>
              </div>
            )}
            {profile.profile_details?.timezone && (
              <div className="flex gap-[5px] justify-center items-center pl-3">
                <Geolocation fontSize={16}  />
                <span className="text-base">
                  {profile.profile_details.timezone}
                </span>
              </div>
            )}
            {profile.profile_details?.availability && (
              <div className="flex gap-[5px] justify-center items-center pl-3">
                <Sms fontSize={16}  />
                <span className="text-base">
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
