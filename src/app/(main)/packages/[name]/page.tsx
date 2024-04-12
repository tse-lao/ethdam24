import { serverApi } from "@/lib/data/server-api";


export default async function PackageDetail({params}: {params: any}) {
  const {data: packageData} = await serverApi(`/packages/single/${params.name}`);
  
  
  return (
    <pre>
      {
        JSON.stringify(packageData, null, 2)
      }
    </pre>
  )
}
