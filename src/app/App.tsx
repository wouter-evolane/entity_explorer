import React from "react";
import { useState } from 'react';
import { AppHeader, AppName, Page, Flex, Code, Heading, Paragraph, FormField, Select,SelectOption } from "@dynatrace/strato-components-preview";
import {getAllEntityTypes} from "./utils/Entity"
import { metricsClient } from "@dynatrace-sdk/client-classic-environment-v2";



export const App = (entityTypes) => {

  var name = "test"
  const [options, setOptions] = useState(entityTypes);

  console.log(entityTypes)
  //debugger
  

  return (
    <Page>
      <Page.Header>
        <AppHeader>
          <AppName />
        </AppHeader>
      </Page.Header>
      <Page.Main>
        <Flex padding={16} flexDirection="column">
        <FormField label="Select an entity">

          <Select name="entity" >
            
          {options.entityTypes.map((object, index) =>   <SelectOption id={object.dimensionKey + index }> {object.dimensionKey} </SelectOption> )}
          </Select>

          </FormField>
          <div>
            <select>

          {options.entityTypes.map((value, label ) => <option value={value + label } >{label}</option>)}      
          </select>
          </div>
        </Flex>
      </Page.Main>
    </Page>
  );
};
