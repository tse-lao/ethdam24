import { Button } from "@/components/ui/button";
import { serverApi } from "@/lib/data/server-api";
import Link from "next/link";
import ProfileTabs from "../_components/profile-page-card/profile-tabs";
import ViewProfileCard from "../_components/profile-page-card/view-profile-card";

export default async function ProfilePageCard() {
  const { data: profile } = await serverApi("/users/my-profile");

  const links = [
    {
      name: "dashboard",
      href: "/",
    },
    {
      name: "projects",
      href: "projects",
    },
    {
      name: "funds",
      href: "fund",
    },
  ] as any;

  return (
    <div className="flex flex-col">
      <ViewProfileCard profile={profile} />
      <ProfileTabs prelink="/me" links={links}>
        <Link href="/me/edit" passHref>
          <Button size="sm">Edit Profile</Button>
        </Link>
      </ProfileTabs>
    </div>
  );
}
