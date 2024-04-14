"use client";



import Searchbar from "@/components/extra/search-bar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ProjectFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showAdvanced, setShowAdvanced] = useState(false);





  return (
    <div className="flex flex-col justify-between gap-4 py-2 mx-auto w-full rounded-md bg-background-layer-1 items-center">
      <div className="flex flex-col  w-full">
        <div className="flex flex-col md:flex-row w-full items-center gap-4 px-8">
          <div className="grow">
            <Searchbar placeholder="search project"size="md" />
          </div>

        </div>
      </div>
    </div>
  );
}