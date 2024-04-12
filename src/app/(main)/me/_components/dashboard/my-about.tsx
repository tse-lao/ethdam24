import { Card, CardContent, CardHeader } from "@/components/ui/card";


export default function MyAbout({ userData }: { userData: any }) {
  return (
    <Card>
      <CardHeader>About me</CardHeader>
      <CardContent className="flex flex-col gap-4">
        <span className="text-sm tracking-wide leading-6">
            {userData.profile_details?.description}
        </span>

      </CardContent>
    </Card>
  );
}
