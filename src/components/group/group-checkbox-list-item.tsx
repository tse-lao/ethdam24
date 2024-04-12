"use client";




import { Check, Square } from "lucide-react";
import Image from "../ui/image";

export default function GroupCheckboxListItem({
  group,
  isChecked,
  onClick,
}: {
  group: any;
  isChecked: Boolean;
  onClick?: any;
}) {


  return (
    <div
      className="flex h-[84px] py-4 px-5 items-center hover:bg-background-layer-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="shrink-0 w-[52px] h-[52px] overflow-hidden mr-5 rounded-full">
        <Image
          src={`https://ipfs.io/ipfs/${group.image}`}
          alt={group.name}
          width="52"
          height="52"
        />
      </div>

      <div className="grow">
        <div className="mb-2 text-title_m">{group.name}</div>
        <div className="text-text-secondary text-label_m">{group.type}</div>
      </div>

      <div className="px-6">
        {isChecked ? (
          <Check className="text-accent-primary"/>
        ) : (
          <Square className="text-border-input"/>
        )}
      </div>
    </div>
  );
}
