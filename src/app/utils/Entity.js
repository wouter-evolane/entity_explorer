import { monitoredEntitiesClient } from "@dynatrace-sdk/client-classic-environment-v2";
var _ = require('lodash');

//https://www.bennadel.com/blog/3201-exploring-recursive-promises-in-javascript.htm
function nextEntityTypePage(previousPage, collectedResults = []) {
    collectedResults = [...collectedResults, ...previousPage.types]
    if (!previousPage.nextPageKey) {
        return collectedResults;
    }
    var promise = monitoredEntitiesClient.getEntityTypes({ 'nextPageKey': previousPage.nextPageKey })
        .then(
            function (followingPage) {
                return (nextEntityTypePage(followingPage, collectedResults)); // RECURSE!
            }
        );
    return (promise);
}



export function getAllEntityTypes() {
    return monitoredEntitiesClient.getEntityTypes()
        .then((previousPage, collectedResults = []) => nextEntityTypePage(previousPage, collectedResults)
        )
        .then(
            function (resultData) {
                let a = _.uniq(resultData);
                return _.uniq(resultData);

            }
        )
        ;
}


export function getEntities(selectedType) {
    let config = {"entitySelector": selectedType.selectedId}
    let entities = [];
    let res
    return monitoredEntitiesClient.getEntities({'entitySelector':config.entitySelector}).then((firstResponse)=>{
        res = firstResponse;
        if (firstResponse.entities) entities.push(...firstResponse.entities);
        while (res.nextPageKey) {
            monitoredEntitiesClient.getEntities({ nextPageKey: response.nextPageKey }).then((nextresponse) => {
                res = nextresponse;
                if (nextresponse.entities) entities.push(...nextresponse.entities);
            });
        }
        return entities ;
    })
}

export function getPropertiesForEntity(entity) {
    return monitoredEntitiesClient.getEntityType({'type':entity.type})
}




export function getEntitiesList(selector, date) {
    return monitoredEntitiesClient.getEntities({ config: { "entitySelector": selector } })
        .then((previousPage, collectedResults = []) => nextEntityTypePage(previousPage, collectedResults)
        )
        .then(
            (resultData)=>{
                return resultData
            }
        );

}
