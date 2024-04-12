import SideMenu from "@/components/ui/extra/side-menu";


export default async function ProjectEditLayout({ children  }: { children: any}) {


  const sidelinks = [
    {
      name: "Project Settings",
      href: "#edit-profile",
    },
    {
      name: "Sources",
      href: "#sources",
    },
    {
      name: "Project Delete",
      href: "#freelance",
    },
  

  ]
  return (
    <div className="flex flex-col md:flex-row gap-5 md:m-10 m-5">
      <div className="w-[320px] ">
        <SideMenu links={sidelinks} />
      </div>
      <div className="flex flex-col gap-md grow" >
        {children}
      </div>
    </div>
  );
}
