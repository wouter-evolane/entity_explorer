"use strict";
import React from 'react';
import { Button } from '@dynatrace/strato-components-preview/buttons';
import { DataTable } from '@dynatrace/strato-components-preview/tables';
import MetricGraph from './MetricGraph';
import { useState } from 'react';


export default MetricDetailTable = ({ entity, metricKeys, dimensionKey }) => {

  const [expandedRows, setExpandedRows] = useState({})
  function onExpandedRowsChange(expandedRows) {
    console.log('Currently expanded:', expandedRows);
    setExpandedRows(expandedRows)
  }

  var columns = [
    {
      header: 'metric',
      accessor: 'metric',
      ratioWidth: 1,
    }


  ]
  const [clickedMetric, setClickedMetric] = useState(null)


  var data = []
  metricKeys.forEach(element => {
    data.push({ metric: element.metricId })
  });

  return (
    <section>
      <DataTable columns={columns} data={data} >
        <DataTable.UserActions>
          <DataTable.RowActions>
            {


              (row) => (
                <Button onClick={(e) => {
                  alert(entity)
                  setClickedMetric(row.data[row.currentRowIndex].metric);


                }} >
                  show graph</Button>
              )}
          </DataTable.RowActions>
        </DataTable.UserActions>
        <DataTable.ExpandableRow>
              {({ row }) => {
                if (clickedMetric){
                  return <MetricGraph dimensionKey={dimensionKey} entityId={entity.entityId} metricName={clickedMetric} onChange={setClickedMetric} />}

                }

              }
            </DataTable.ExpandableRow>

      </DataTable>

    </section>
  );


}