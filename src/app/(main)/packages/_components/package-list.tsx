

import PageHeader from "@/components/ui/page-header";
import { serverApi } from "@/lib/data/server-api";
import { packageColumns } from "./package-columns";
import { PackageTable } from "./table";

export default async function PackageList() {
  const { data: packages } = await serverApi("/packages");

  return (
    <div className="flex flex-col gap-md">
      <PageHeader title="Packages" subtitle="all packages used in the projects. "/>
      <PackageTable
        columns={packageColumns}
        data={packages}
        hideColumn={true}
      />
          </div>
  );
}
