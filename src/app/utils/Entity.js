"use strict";
import { monitoredEntitiesClient } from "@dynatrace-sdk/client-classic-environment-v2";


export  async function getAllEntityTypes() {
    let result = []
    let response = await monitoredEntitiesClient.getEntityTypes()
    result =result.concat(response.types)
    while (response.nextPageKey != undefined) {
        response = await monitoredEntitiesClient.getEntityTypes({ nextPageKey: response.nextPageKey })
        result = result.concat(response.types);
    }
    return result;
}


export async function getEntities(selectedType) {
    let config = { "entitySelector": selectedType }
    let result = [];
    let response = await monitoredEntitiesClient.getEntities({ 'entitySelector': config.entitySelector })
    result =result.concat(response.entities)
    while (response.nextPageKey != undefined) {
        response = await monitoredEntitiesClient.getEntities({ nextPageKey: response.nextPageKey })
        result = result.concat(response.entities);
    }
    return result
}

export async function getEntity(entityId) {
    data = await monitoredEntitiesClient.getEntity({entityId: entityId});
    return data;
}
