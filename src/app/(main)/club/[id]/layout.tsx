
import { serverApi } from "@/lib/data/server-api";
import ClubHeader from "./_components/club-header";

export default async function ClubLayout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const { data } = await serverApi(`/clubs/${params.id}`);

  return (
    <main className="flex flex-col gap-10 mx-2 sm:mx-10 lg:mx-20">
      <ClubHeader id={params.id} />
      <div className="">{children}</div>
    </main>
  );
}
