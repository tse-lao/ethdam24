



import { serverApi } from "@/lib/data/server-api";
import ClubListItem from "./club-list-item";

export default async function ClubList() {
  
  const {data:groups} = await serverApi('/clubs');

  return (
    <div>


      <div className="grid  w-full items-stretch gap-10 mb-10 sm:grid-cols-2  lg:grid-cols-4 2xl:grid-cols-4">
        {groups.map((group: any) => (
          <ClubListItem
            key={group.id}
            details={group}
            isPending={!group.verified}
          />
        ))}
      </div>

    </div>
  );
}
