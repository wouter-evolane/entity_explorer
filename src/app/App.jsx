import React from "react";
import { useState } from 'react';
import { AppHeader, TimeframeSelector, Button, AppName, Page, Flex, Code, Heading, Paragraph, FormField, SelectV2, DatePicker } from "@dynatrace/strato-components-preview";
import { getAllEntityTypes } from "./utils/Entity"
import {
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import EntityList from "./components/EntityList";

var _ = require('lodash');

export const App = () => {
  const queryClient = useQueryClient()
  const [entityTypes, SetEntityTypes] = useState();

  const { isLoading, isError, data, error } = useQuery({ queryKey: ['entityTypes'], queryFn: getAllEntityTypes })
  const [timeFrame, setTimeFrame] = useState(null);
  const [selector, setSelector] = useState('type("dt.entity.host")');
  const [selectedType, setSelectedType] = useState('type("dt.entity.host")');
  const [selectedEntity, setSelectedEntity] = useState(null);

  var submitEntityType = (evt) => {
    console.log(evt)
    setSelectedType(evt)

  };
  var updateTimeFrame = (evt) => {
    setTimeFrame(evt)
    console.log(evt);
  }
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

          <EntityList selectedId={selector}  />



          <div>
          </div>
        </Flex>



      </Page.Main>
      <Page.DetailView><EntityList entityDetail={selectedEntity} onSelectEntity={setSelectedEntity}/></Page.DetailView>
      <Page.Sidebar>
        <FormField label="Select an entity">
          <SelectV2 name="entitytype" selectedId={selectedType} onChange={submitEntityType}>
            <SelectV2.Content>
              {data.map((object, index) => <SelectV2.Option key={object.dimensionKey + index} value={object.dimensionKey}> {object.displayName} </SelectV2.Option>)}
            </SelectV2.Content>
          </SelectV2>
          <TimeframeSelector value={timeFrame} onChange={(evt) => updateTimeFrame(evt)} />
          <Button color="neutral" variant="accent" onClick={(evt) =>clickGetEnitities(evt)}>Get Entities</Button>
        </FormField>
      </Page.Sidebar>

    </Page>
  );
};
