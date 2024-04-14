import { tables } from "@/constants/tableland-tables"
import { getTableland } from "@/lib/tableland"

export default function ClubPage() {
  //get the tableland information
  const data = getTableland(`SELECT * FROM ${tables.profiles}`)
  return (
    <div>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>  
    </div>
  )
}
