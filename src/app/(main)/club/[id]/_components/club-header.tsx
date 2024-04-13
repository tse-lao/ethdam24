// import Image from "next/image";


import ProfileTabs from "@/app/(main)/me/_components/profile-page-card/profile-tabs";
import { serverApi } from "@/lib/data/server-api";

import { addURL } from "@/lib/utils";
import { Abstract13, Bank, People } from "detechies-icons";
import Image from "next/image";


export default async function ClubHeader({
  id
}: {
  id: string;
}) {
  const { data: clubDetails } = await serverApi(`/clubs/${id}`);
  const links = [
    {
      name: "overview",
      href: ""
    },
    {
      name: "pools",
      href: "pools",
    },
    {
        name: "members",
        href: "members",
        },
        {
        name: "transactions",
        href: "transactions",
        },
        {
        name: "settings",
        href: "settings",
    }
  ] as any;
  return (
    <div className="">
      <header className=" gap-10 justify-center text-center 	bg-[url('/hexagon-header.png')] bg-auto bg-no-repeat bg-center  ">
        <div className="flex flex-col gap-3.5 mx-auto  py-10">
          <div className="mx-auto h-[100px] w-[100px] rounded-full relative border-2 border-accent-primary  bg-background-layer-2">
            <Image
              src={addURL(clubDetails.image)}
              sizes={"32"}
              alt="teams_picture"
              className="p-4 rounded-full"
              fill
            />
          </div>

          <div>
            <h1 className="text-subhead_m text-text-primary">
              {clubDetails.name}
            </h1>
          </div>
          <div className="flex text-2sm gap-[18px] text-gray-600 mx-auto">
            <div className="flex gap-[5px] justify-center items-center">
              <Abstract13  fontSize="16" />
              <span className="">Pools</span>
            </div>

            <div className="flex gap-[5px] first-letter:justify-center items-center">
              <Bank fontSize="16"  />
              <span className="">100.000.000</span>
            </div>

            <div className="flex gap-[5px] justify-center items-center text-gray-600">
              <People fontSize="16" />
              <span className="">
                {clubDetails.members.length} members
              </span>
            </div>
          </div>
        </div>
      </header>
      <div className="sticky top-0">
        <ProfileTabs links={links} prelink={`/club/${clubDetails.id}`}>

        </ProfileTabs>
      </div>
    </div>
  );
}
