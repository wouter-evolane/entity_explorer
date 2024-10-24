"use strict";
import { metricsClient } from "@dynatrace-sdk/client-classic-environment-v2";
import { forEach } from "lodash";


//generates an index per entitytype  of all available metrics
export async function getMetricDimensions() {
    let result = []
    let response = await metricsClient.allMetrics({
        acceptType: "application/json; charset=utf-8",
        fields: "dimensionDefinitions,entityType,displayname"
    }
    )
    result = result.concat(response.metrics)
    while (response.nextPageKey != undefined) {
        response = await metricsClient.allMetrics({ acceptType: "application/json; charset=utf-8", nextPageKey: response.nextPageKey })
        result = result.concat(response.metrics);
    }
    var index = {}

    result.forEach(metric => {

        metric.dimensionDefinitions.forEach(dimension => {
            if (index[dimension.key] === undefined) {
                index[dimension.key] = [metric]
            }
            else {
                index[dimension.key].push(metric)

            }

        });

    });

    return index;
}

export async function runMetricQuery(metricSelector) {

    return metricsClient.query({ "metricSelector": metricSelector })
}


export function convertClassicMetricToTimeSeries(name, unit, data, resolution) {
    let resultelement = {
        name: [name],
        unit: unit,
        datapoints: []
    }
    for (var i = 0; i < data.values.length; i++) {

        let element = {

            start : new Date(data.timestamps[i]),
            value : data.values[i]
        }
        //https://docs.dynatrace.com/docs/shortlink/api-metrics-v2-get-datapoints#timeframe-note 
      /*  if (i === 0) {
            element.start = end - resolution
        } else {
            element.start = end[i - 1] + 1
        }
        element.end = data.timestamps[i]
        element.value = data.values[i]
        */

        resultelement.datapoints.push(element)

    }


    return [resultelement]

}