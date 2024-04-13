

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

import PageHeader from "@/components/ui/page-header";
import ClubList from "./_components/club-list";
import ClubLoading from "./loading";

export default async function ClubPage() {

  return (
    <main className="flex flex-col gap-10 m-2 md:m-10 ">
      <PageHeader title="Clubs" subtitle="Create your decentralized funding club.">
        <Link href={`/club/create`} passHref>
          <Button className="btn btn-primary">Create Club</Button>
        </Link>
        </PageHeader>
      <Suspense fallback={<ClubLoading />}>
          <ClubList />
        </Suspense>
    </main>
  );
}
