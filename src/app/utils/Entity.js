import { monitoredEntitiesClient } from "@dynatrace-sdk/client-classic-environment-v2";

//https://www.bennadel.com/blog/3201-exploring-recursive-promises-in-javascript.htm


export function getAllEntityTypes(){
    monitoredEntitiesClient.getEntityTypes()
    .then(
        function nextPage( previousPage, collectedResults = [] ) {
            console.log("previousPage")
            console.log(previousPage)
            debugger
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
    )
    .then(
        function(resultData) {
            console.log("resultData")

            console.log(resultData)

        }
    )
;




}
