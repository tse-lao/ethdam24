import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header";
import Link from "next/link";
import PoolList from "./_components/pool-list";

export default function Page() {
  return (
    <main className="flex flex-col gap-10">
      <PageHeader
        title="Pools"
        subtitle="Create your decentralized funding pool."
      >
        <Link href={`/club/create`} passHref>
          <Button className="btn btn-primary">Create Pool</Button>
        </Link>
      </PageHeader>
      <PoolList />
    </main>
  );
}
