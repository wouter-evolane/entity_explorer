"use strict"
import React,{ useState } from 'react';
import { Skeleton } from '@dynatrace/strato-components-preview/layouts-core';
import { convertClassicMetricToTimeSeries } from "../utils/Metrics"
import { TimeseriesChart } from '@dynatrace/strato-components-preview/charts';
import {
    useQuery,
} from '@tanstack/react-query'
import { metricsClient } from "@dynatrace-sdk/client-classic-environment-v2";

export default MetricGraph = ({ dimensionKey, entityId, metricName, onChange }) => {


    const [query,setQuery]= useState(`${metricName}:filter(in("${dimensionKey}",entitySelector("type(${dimensionKey}),entityId(~"${entityId}~")"))):splitBy():sort(value(auto,descending)):limit(20)`)

    const { isLoading, isError, data, error } = useQuery({ queryKey: [query], queryFn: () => metricsClient.query({acceptType: "application/json; charset=utf-8",'metricSelector' : query}) })

    if (isLoading){

        return (<Skeleton width="100%" height="40px" />)
    }
    if (data){
        let a = convertClassicMetricToTimeSeries(metricName,"count",data.result[0].data[0],1000)
        console.log(a)
        //return (<Skeleton width="100%" height="40px" />)
        return(<TimeseriesChart data={a} />)
    }
}