import { Card } from "@/components/ui/card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-screen bg-auth-background dark:bg-dark-auth-background bg-center bg-cover flex justify-center items-center">
      <Card className=" mx-auto my-auto p-10 w-fit rounded-md border flex flex-col gap-[30px] ">
        {children}
      </Card>
    </main>
  );
}
