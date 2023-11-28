import { monitoredEntitiesClient } from "@dynatrace-sdk/client-classic-environment-v2";
var _ = require('lodash');

//https://www.bennadel.com/blog/3201-exploring-recursive-promises-in-javascript.htm
function nextPage( previousPage, collectedResults = [] ) {
    collectedResults = [...collectedResults ,... previousPage.types]
    if (!previousPage.nextPageKey){    
        return collectedResults;
    }
    var promise = monitoredEntitiesClient.getEntityTypes({'nextPageKey':previousPage.nextPageKey})
    .then(
        function(followingPage) {
            return( nextPage(followingPage,collectedResults) ); // RECURSE!
        }
    );
    return( promise );
}

export function getAllEntityTypes(){
    return monitoredEntitiesClient.getEntityTypes()
    .then( (previousPage, collectedResults = []) => nextPage( previousPage, collectedResults)
    )
    .then( 
        function(resultData) {
            let a =_.uniq(resultData);
            return _.uniq(resultData);

        }
    )
;
}
export function getEntitiesList(selector,date){
return new Promise (() =>console.log('entitieslist'))

}
