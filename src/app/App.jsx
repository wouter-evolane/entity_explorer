"use strict";
import React from "react";
import { useState } from 'react';
import { AppHeader, TimeframeSelector, Button, AppName, Page, Flex, SelectV2 ,ProgressCircle } from "@dynatrace/strato-components-preview";
import { getAllEntityTypes } from "./utils/Entity"
import { getMetricDimensions } from "./utils/Metrics"
import {
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import EntityList from "./components/EntityList";
var _ = require('lodash');



export const App = () => {
  const { isLoadingEntities, isError, data, error } = useQuery({ queryKey: ['getAllEntityTypes'], queryFn: getAllEntityTypes, refetchIntervalInBackground: false })

  const {
    status,
    data: metricIndex,
    error1,
    isFetching,
  } = useQuery({ queryKey: ['getMetrics'], queryFn: getMetricDimensions, refetchIntervalInBackground: false, refetchOnMount: false, staleTime: Infinity })



  const [timeFrame, setTimeFrame] = useState(null);
  const [selectedType, setSelectedType] = useState('dt.entity.host');
  const [selectedObject, setSelectedObject] = useState();

  var submitEntityType = (evt) => {
    setSelectedType(evt)

  };
  var updateTimeFrame = (evt) => {
    setTimeFrame(evt)
    console.log(evt);
  }
  if (isLoadingEntities) {
    return <span>Retrieving EntityTypes... <ProgressCircle/></span>
  }
  if (isFetching) {
    return <span>building Metrics index... <ProgressCircle/></span>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (error1) {
    return <span>Error: {error.message}</span>
  }


  return (

    <Page>
      <Page.Header>
        <AppHeader>
          <AppName />
        </AppHeader>
      </Page.Header>
      <Page.Main>
        <Flex flexDirection="row">
          <SelectV2 name="entitytype" selectedId={selectedType} onChange={(evt) => submitEntityType(evt)} label="Select EntityType">
            <SelectV2.Trigger width="400px" />
            <SelectV2.Filter />

            <SelectV2.Content>
              {data.map((object, index) => <SelectV2.Option key={object.dimensionKey + index} value={object.dimensionKey}> {object.displayName} </SelectV2.Option>)}
            </SelectV2.Content>
          </SelectV2>
          <TimeframeSelector value={timeFrame} onChange={(evt) => updateTimeFrame(evt)} />
          <Button color="neutral" variant="accent" onClick={(evt) => clickGetEnitities(evt)


          }>Get Entities</Button>

        </Flex>
        <Flex padding={16} flexDirection="column">
          {selectedType}
          <EntityList selectedType={selectedType} onSelectEntity={setSelectedObject} metricIndex={metricIndex} timeFrame={timeFrame}/>
        </Flex>
        <Flex padding={16} flexDirection="column">
        </Flex>


      </Page.Main>

    </Page>
  );
};
