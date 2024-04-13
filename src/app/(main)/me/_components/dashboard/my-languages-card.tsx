import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { serverApi } from "@/lib/data/server-api";

export default async function MyLanguagesCard({
  address,
}: {
  address: string;
}) {
  const { data: languages } = await serverApi(`/users/${address}/languages`);

  const randomColors = ["info", "default", "tertiary", "warning", "accent"];

  return (
    <Card>
      <CardHeader>Languages</CardHeader>
      <CardContent>
        {languages?.length > 0 ? (
          <div className="flex flex-row gap-2 flex-wrap">
            {languages?.map((language: any, index: number) => (
              <Badge
                key={index}
                className="flex flex-col gap-2 p-3 content-center items-center"
                variant="secondary"
              >
                {language.name}
              </Badge>
            ))}
          </div>
        ) : (
          <p>No languages</p>
        )}
      </CardContent>
    </Card>
  );
}
