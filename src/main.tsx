import React from "react";
import ReactDOM from "react-dom";
import { AppRoot } from "@dynatrace/strato-components-preview";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/App";
import {getAllEntityTypes} from "./app/utils/Entity"
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
var entityTypes = Array();

/* async function loadData() {
  const e = await getAllEntityTypes().then(
    (items) => { 
      items.forEach( (element) => {
        //console.log(element)
        entityTypes.push(element)
      });
    }

  );
}
*/


const queryClient = new QueryClient()
ReactDOM.render(
  <AppRoot>
    <BrowserRouter basename="ui">
    <QueryClientProvider client={queryClient}>
      <App/>
      </QueryClientProvider>
    </BrowserRouter>
  </AppRoot>,
  document.getElementById("root")
);
