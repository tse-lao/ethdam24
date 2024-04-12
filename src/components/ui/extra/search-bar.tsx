"use client";
import { CornerDownLeft } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "../input";


export default function Searchbar({
  placeholder,
  size,
  className,
}: {
  placeholder: string;
  size?: "default" | "md" | undefined;
  className?: string;
}) {
  const router = useRouter();
  const [text, setText] = useState("");
  const query = text.trim();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (searchParams.has("search")) {
      setText(searchParams.get("search") || "");
    }
  }, [searchParams]);

  async function performSearch() {

    const params: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      if (key !== "search" && key !== "limit") {
        params[key] = value;
      }
    });

    if (query) {
      params["search"] = query;
    }

    const queryString = new URLSearchParams(params).toString();
    router.push(`${pathname}?${queryString}`);
  }

  return (
    <div className="flex flex-row rounded-sm flex-grow items-center gap-4 pr-8 bg-background-layer-1 justify-between min-w-full max-w-2xl mx-auto my-auto">
      <div className="flex items-center gap-2 grow">
        <Input
          value={text}
          type=""
          placeholder={placeholder}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              performSearch(); 
            }
          }}
          className="text-sm"
        />
      </div>
      {text && (
        <div>
          <CornerDownLeft className="text-accent-primary animate-pulse " />
        </div>
      )}
    </div>
  );
}
