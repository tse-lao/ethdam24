


export const TablelandGateway =
  "https://testnets.tableland.network/api/v1/query?statement=";

export const getTableland = async (queryString:string) => {
  const getAllSchemasQuery =
    TablelandGateway + queryString
  try {
    const result = await fetch(getAllSchemasQuery);
    return result.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};
