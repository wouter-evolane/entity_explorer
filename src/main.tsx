import React from "react";
import ReactDOM from "react-dom";
import { AppRoot } from "@dynatrace/strato-components-preview";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/App";
import {getAllEntityTypes} from "./app/utils/Entity"

var entityTypes = Array();

 async function loadData() {
  const e = await getAllEntityTypes().then(
    (items) => { 
      items.forEach( (element) => {
        //console.log(element)
        entityTypes.push(element)
      });
    }

  );
}




ReactDOM.render(
  <AppRoot>
    <BrowserRouter basename="ui">
      <App entityTypes={entityTypes}/>
    </BrowserRouter>
  </AppRoot>,
  document.getElementById("root")
);
