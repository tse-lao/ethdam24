
import { tables } from "@/constants/TablelandTables"
import { getTableland } from "@/lib/tableland"
import { CreatePool } from "./create-pool-form"

export default async function CreatePoolPage({params}: {params: {id: string}}) {

    const data = await getTableland(`SELECT * FROM ${tables.profiles} WHERE metadata='${params.id}'`)
  return (
    <div>
        <pre> 
            Showing data
            {JSON.stringify(data[0], null, 2)}
        </pre>
        
        {data[0].profileID ?         
        <CreatePool profileId={data[0].profileID}/>
        : <div>Profile not found</div>
        }
    </div>
  )
}


