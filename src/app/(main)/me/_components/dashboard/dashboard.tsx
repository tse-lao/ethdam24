import { serverApi } from "@/lib/data/server-api";
import MyProjectsCard from "../my-projects-card";
import MyAbout from "./my-about";
import MyConnections from "./my-connections-card";
import MyLanguagesCard from "./my-languages-card";
import MyTagsCard from "./my-tags-card";
import MyUsedPackages from "./my-used-packages";

export default async function UserDashboard({ address }: { address?: any }) {
  const { data: user } = await serverApi('/users/me');

  if (!user.profile_details?.skills && user.projects.length < 1) {
    return (
      <span>No profiles found</span>
    );
  }
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-[350px] md:shrink-0 w-full flex flex-col gap-10">
          <MyAbout userData={user} />
          <MyLanguagesCard address={user?.wallet} />
          <MyTagsCard tags={user?.profile_details?.skills} />
          <MyConnections address={user.wallet} />
        </div>
        <div className="flex flex-col gap-10 grow">
          <div className="grid  lg:grid-cols-2 gap-10">
            <MyProjectsCard user={user?.wallet} />
            <MyUsedPackages user={user?.wallet} />
          </div>
        </div>
      </div>
    </div>
  );
}
