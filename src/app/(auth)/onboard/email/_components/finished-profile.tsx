"use client";
import { serverApi } from "@/lib/data/server-api";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type Item = {
  icon: JSX.Element;
  title: string;
  description: string;
  link: string;
};

export default function FinishedProfile() {
  const { data, update } = useSession();
  const items = [
    {
      icon: (
        <Image
          src="/icons/profile_career.png"
          alt="career"
          width={40}
          height={40}
        />
      ),
      title: "developer",
      description: "start build your dev profiles",
      link: "/me/edit",
    },
    {
      icon: (
        <Image
          src="/icons/profile_client.png"
          alt="client"
          width={40}
          height={40}
        />
      ),
      title: "Projects",
      description: "find all the available projects",
      link: "/projects",
    },
    {
      icon: (
        <Image
          src="/icons/profile_admin.png"
          alt="admin"
          width={40}
          height={40}
        />
      ),
      title: "Drop some Money?",
      description: "Join a investment group and drop your money",
      link: "/teams",
    },
  ];

  useEffect(() => {
    const updateUserSession = async () => {
      const { data: user } = await serverApi('/users/me');

      if (!data || !data.web3.user) {
        return;
      }
      await update({
        ...data,
        web3: {
          ...data.web3,
          user: {
            ...data?.web3?.user,
            ...user,
          },
        },
      });
    };
    updateUserSession();
  }, [data, update]);

  return (
    <section className="flex flex-col max-w-sm gap-8">
      <header>
        <h1 className="mb-3 text-md">
          Your account is ready
        </h1>
        <h5 className="text-gray-600 text-xs">
          Feel free to take a look around teh applicatoin
        </h5>
      </header>

      <div className="flex flex-col gap-8">
        {items.map((item: any, index: any) => (
          <LinkItem item={item} key={index} />
        ))}
      </div>
    </section>
  );
}

type LinkItemProps = {
  item: Item;
};

export function LinkItem({ item }: LinkItemProps) {
  return (
    <Link href={item.link} className="flex items-center gap-6 group">
      <div className="shrink-0">{item.icon}</div>
      <div className="flex flex-col text-left grow">
        <h5 className="text-title_m">{item.title}</h5>
        <h6 className="text-label_m text-secondary">{item.description}</h6>
      </div>

      <ChevronRight className="w-8 h-8 shrink-0 text-icon-secondary" />
    </Link>
  );
}
