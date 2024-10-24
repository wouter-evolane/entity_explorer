"use strict";
import React, { useMemo } from 'react';

import { useState } from 'react';
import { Button } from '@dynatrace/strato-components-preview/buttons';
import { DataTable } from '@dynatrace/strato-components-preview/tables';
import { getEntities, getEntity } from "../utils/Entity"
import { Skeleton, Flex } from '@dynatrace/strato-components-preview/layouts-core';
import {
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import MetricDetailModal from './MetricDetail';



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


EntityListExpanded = ({ row, expandedRows, table }) => {

  const queryClient = useQueryClient()
  console.log(row["entityId"])

  if (expandedRows[row] === true)
    return (
      <Flex flexDirection="column">
        <Skeleton width="100%" height="40px" />
      </Flex>
    )
  else {

    const { isLoading, isError, data, error } = useQuery({ queryKey: ['entity' + row["entityId"]], queryFn: () => getEntity(row["entityId"]) })
    if (data) {
      console.log(data)
      const rows = [];
      for (const property in data) {
        if (typeof (data[property]) === "string") {
          rows.push(<p>{property}:{data[property]}</p>)

        }
      }
      rows.push()
      return rows


    } else {
      return (<Flex flexDirection="column">
        <Skeleton width="100%" height="40px" />
      </Flex>)
    }
  }

}


export default EntityList = ({ selectedType, onSelectEntity, metricIndex }) => {

  const columns = useMemo(() => sampleColumns, []);
  const [expandedRows, setExpandedRows] = useState({})
  const [EntityDetail, setEntityDetail] = useState(null)
  const [MetricDetail, setMetricDetail] = useState(null)




  function onExpandedRowsChange(expandedRows) {
    console.log('Currently expanded:', expandedRows);
    setExpandedRows(expandedRows)
  }


  if (selectedType === false) {
    return <span>Select an entity type</span>

  } else {
    const { isLoading, isError, data, error } = useQuery({ queryKey: ['list' + [selectedType]], queryFn: () => getEntities('type("' + selectedType + '")') })

    if (isLoading) {
      return <span>Retrieving Entities...</span>
    }

    if (isError) {
      return <span>Error: {error.message}</span>
    }
    if (data) {

      return (


        <section>


          {MetricDetail && <MetricDetailModal entity={MetricDetail} setVisible={setMetricDetail} metrics={metricIndex} />}





          <DataTable columns={columns} expandedRows={expandedRows} data={data} onExpandedRowsChange={(rows) => onExpandedRowsChange(rows)}>
            <DataTable.Toolbar>

              <DataTable.DownloadData />

            </DataTable.Toolbar>
            <DataTable.UserActions>
              <DataTable.RowActions>
                {


                  (row) => (
                    <Button onClick={(e) => {
                      setMetricDetail(row.data[row.currentRowIndex])
                    }} >
                      show metrics</Button>
                  )}
              </DataTable.RowActions>
            </DataTable.UserActions>
            <DataTable.ExpandableRow>
              {({ row }) => {
                var returnvalue = <EntityListExpanded row={row} table={data} expandedRows={expandedRows} />;
                return returnvalue

              }}
            </DataTable.ExpandableRow>
          </DataTable>
        </section>);

    }


  }






};

