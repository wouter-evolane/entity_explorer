import {
    QueryClient,
    QueryClientProvider,
    useQuery,
    useQueryClient
  } from '@tanstack/react-query'
  import { DataTable } from "@dynatrace/strato-components-preview";

  export const entityDisplay = (entitySelector,timeRange) => {
    const queryClient = useQueryClient()
    const { isLoading, isError, data, error } = useQuery({ queryKey: ['entity'], queryFn: () => {getEntitiesList(entitySelector,timeRange)}})
    const sampleColumns = [

      {
    
        header: 'Host',
    
        accessor: 'host',
    
        ratioWidth: 1,
    
      },
    
      {
    
        header: 'Traffic',
    
        accessor: 'traffic',
    
        ratioWidth: 1,
    
      },
    
      {
    
        header: 'Memory Total',
    
        accessor: 'memoryTotal',
    
        ratioWidth: 1,
    
      },
    
      {
    
        header: 'Timestamp',
    
        accessor: 'timestamp',
    
        ratioWidth: 1,
    
      },
    
    ];
    const sampleData = [

      {
    
        host: 'et-demo-2-win4',
    
        traffic: '213.4',
    
        memoryTotal: 5830000000,
    
        timestamp: '2022-09-26T12:45:07Z',
    
        price: 290,
    
      },
    
      {
    
        host: 'et-demo-2-win3',
    
        traffic: '374',
    
        memoryTotal: 3520000000,
    
        timestamp: '2022-09-27T14:10:02Z',
    
        price: 324,
    
      },
    
      {
    
        host: 'et-demo-2-win1',
    
        traffic: '625',
    
        memoryTotal: 4670000000,
    
        timestamp: '2022-09-27T13:10:02Z',
    
        price: 343,
    
      },
    
      {
    
        host: 'et-demo-2-win8',
    
        traffic: '98.7',
    
        memoryTotal: 5820000000,
    
        timestamp: '2022-09-28T11:29:10Z',
    
        price: 289,
    
      },
    
      {
    
        host: 'dev-demo-5-macOS',
    
        traffic: '164.6',
    
        memoryTotal: 3460000000,
    
        timestamp: '2022-09-28T10:22:56Z',
    
        price: 193,
    
      },
    
    ];
    const columns = useMemo(() => sampleColumns, []);

    const tabledata = useMemo(() => sampleData, []);

    return (

    
       <DataTable columns={columns} data={tabledata}></DataTable>


    )

}