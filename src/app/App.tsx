import React from "react";
import { useState } from 'react';
import { AppHeader, AppName, Page, Flex, Code, Heading, Paragraph, FormField, Select,SelectOption } from "@dynatrace/strato-components-preview";
import {getAllEntityTypes} from "./utils/Entity"
import { metricsClient } from "@dynatrace-sdk/client-classic-environment-v2";

async function test() {
  const timeout = 60;
  const data = await metricsClient.query({
    metricSelector: 'builtin:pgi.availability',
    acceptType: "application/json; charset=utf-8"
  });
  return data.result;
}

import { monitoredEntitiesClient } from "@dynatrace-sdk/client-classic-environment-v2";



getAllEntityTypes();


export const App = () => {
  const [entityTypes, setEntityTypes] = useState([]);
  var name = "test"
  let options = []


  return (
    <Page>
      <Page.Header>
        <AppHeader>
          <AppName />
        </AppHeader>
      </Page.Header>
      <Page.Main>
        <Flex padding={16} flexDirection="column">
        <FormField label="Select a country">

          <Select name="country">

          </Select>

          </FormField>


        </Flex>
      </Page.Main>
    </Page>
  );
};
