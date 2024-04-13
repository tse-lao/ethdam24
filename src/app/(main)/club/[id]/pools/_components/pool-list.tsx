import PoolListItem from "./pool-list-item"

export default function PoolList() {
    const data = [
        {
            status: "active", 
            name: "Pool 1",
            description: "This is a pool description",
            start_date: "2022-10-10",
            end_date: "2022-10-10", 
            total: 100,
        }, 
        {
            status: "active", 
            name: "Pool 2",
            description: "This is a pool description",
            start_date: "2022-10-11",
            end_date: "2022-10-11", 
            total: 20,
        }, 
        {
            status: "active", 
            name: "Pool 3",
            description: "This is a pool description",
            start_date: "2022-10-12",
            end_date: "2022-10-12", 
            total: 50,
        },
        {
            status: "active", 
            name: "Pool 4",
            description: "This is a pool description",
            start_date: "2022-10-13",
            end_date: "2022-10-13", 
            total: 100,
        },
        {
            status: "active", 
            name: "Pool 5",
            description: "This is a pool description",
            start_date: "2022-10-14",
            end_date: "2022-10-14", 
            total: 500,
        },
        {
            status: "active", 
            name: "Pool 6",
            description: "This is a pool description",
            start_date: "2022-10-15",
            end_date: "2022-10-15", 
            total: 600,
        },
        {
            status: "active", 
            name: "Pool 7",
            description: "This is a pool description",
            start_date: "2022-10-16",
            end_date: "2022-10-16", 
            total: 700,
        },
        {
            status: "active", 
            name: "Pool 8",
            description: "This is a pool description",
            start_date: "2022-10-17",
            end_date: "2022-10-17", 
            total: 800,
        },
        {
            status: "active", 
            name: "Pool 9",
            description: "This is a pool description",
            start_date: "2022-10-18",
            end_date: "2022-10-18", 
            total: 900,
        },
        {
            status: "active", 
            name: "Pool 10",
            description: "This is a pool description",
            start_date: "2022-10-19",
            end_date: "2022-10-19", 
            total: 1000,
        },
        {
            status: "active", 
            name: "Pool 11",
            description: "This is a pool description",
            start_date: "2022-10-20",
            end_date: "2022-10-20", 
            total: 1100,
        }
    ]
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-10 ">
        {
           data && data.map((item, index) => (
                <PoolListItem key={index} details={item} />
            ))
        }
    </div>
  )
}
