import React from "react";
import { useState } from 'react';
import { AppHeader,TimeframeSelector,Button, AppName, Page, Flex, Code, Heading, Paragraph, FormField, Select,SelectOption, DatePicker } from "@dynatrace/strato-components-preview";
import {getAllEntityTypes} from "./utils/Entity"
import { metricsClient } from "@dynatrace-sdk/client-classic-environment-v2";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

var _ = require('lodash');

export const App = () => {
  const queryClient = useQueryClient()
  let selected = null
  const { isLoading, isError, data, error } = useQuery({ queryKey: ['todos'], queryFn: getAllEntityTypes })
  const [timeFrame, setTimeFrame] = useState(null);
  const [selectedType,setSelectedType] = useState(null);
  const [entitySelector,setEntitySelector] = useState(null)
  var submitEntity = (evt) => {
    setSelectedType(evt)

  };
  var updateTimeFrame = (evt)=>{
    setTimeFrame(evt)
    console.log(evt);
  }
  var clickGetEnitities = (evt) => {
    console.log(selectedType)
    console.log(timeFrame)

  };
  //debugger
  if (isLoading) {
    return <span>Retrieving EntityTypes...</span>
  }

  if (isError) {
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
        <Flex padding={16} flexDirection="column">


        <entityDisplay />
        
        
          <div>
          </div>
        </Flex>
      </Page.Main>
      <Page.Sidebar>
      <FormField label="Select an entity">
<Select name="entitytype"        selectedId={selectedType} onChange={submitEntity} hasFilter>
  {console.log(data)}
  { data.map((object, index) =>   <SelectOption id={object.dimensionKey }> {object.dimensionKey} </SelectOption> )}
</Select>
<TimeframeSelector value={timeFrame} onChange={(evt) =>updateTimeFrame(evt)} />
<Button color="neutral" variant="accent" onClick={clickGetEnitities}>Get Entities</Button>




</FormField>
        
      </Page.Sidebar>
    </Page>
  );
};
