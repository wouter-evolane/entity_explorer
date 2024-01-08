import React, { useMemo } from 'react';

import { useState } from 'react';
import { ZoomInIcon, ActionIcon } from '@dynatrace/strato-icons';
import { DataTable , TableUserActions} from '@dynatrace/strato-components-preview/tables';
import { getEntitiesList, getEntities } from "../utils/Entity"
import {

  Flex,

  Surface,

} from '@dynatrace/strato-components-preview/layouts-core';

import {
  useQuery,
  useQueryClient
} from '@tanstack/react-query'


const sampleColumns = [

  {
    header: 'entityId',
    accessor: 'entityId',
    ratioWidth: 2,
  },
  {
    header: 'type',
    accessor: 'type',
    ratioWidth: 1,
  }, {
    header: 'displayName',
    accessor: 'displayName',
    ratioWidth: 4,
  }
];



const sampleData = [



];

export default EntityList = (selectedType, onSelectEntity) => {

  const columns = useMemo(() => sampleColumns, []);

  const queryClient = useQueryClient()
  const [entities, setEntities] = useState();
  const [selectedRows, setSelectedRows] = useState(null);
  const myRowSelectionChangedListener = (selectedRows, selectedRowsData, trigger) => {
    debugger
    console.log('row selection obj', selectedRows);
    console.log('row selection data', selectedRowsData);
    console.log('trigger', trigger);
    setSelectedRows(selectedRows);
  };




  if (selectedType.selectedId === null) {
    return <span>Select an entity type on the left</span>

  } else {
    const { isLoading, isError, data, error } = useQuery({ queryKey: ['entities'], queryFn: () => getEntities(selectedType) })

    if (isLoading) {
      return <span>Retrieving Entities...</span>
    }

    if (isError) {
      return <span>Error: {error.message}</span>
    }
    debugger
    return <DataTable columns={columns} data={data}>


      <DataTable.Toolbar>

        <DataTable.DownloadData />

      </DataTable.Toolbar>
      <DataTable.UserActions>
     <DataTable.CellActions>
            {({ cell }) => (
              <TableUserActions>
                <TableUserActions.Item

onSelect={() => {

  /* trigger custom action */

  console.log(`CLICK`);

}}

>
                  <TableUserActions.ItemIcon  >
                    <ActionIcon/>
                  </TableUserActions.ItemIcon>
                  </TableUserActions.Item>
              </TableUserActions>
            )}
          </DataTable.CellActions>
      </DataTable.UserActions>
    </DataTable>;

  }






};

