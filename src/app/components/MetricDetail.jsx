"use strict";
import React, { Component, useState } from 'react'
import { Modal } from '@dynatrace/strato-components-preview/overlays';
import { monitoredEntitiesClient } from "@dynatrace-sdk/client-classic-environment-v2";
import MetricDetailTable from "./MetricDetailTable"
import { Skeleton } from '@dynatrace/strato-components-preview/layouts-core';
import {
    useQuery,
} from '@tanstack/react-query'




export default MetricDetailModal = ({ entity, setVisible, metrics }) => {

    //used to get the dimension key for the entity to get the metrics from the metrics array
    const { isLoading, isError, data: entityType, error } = useQuery({ queryKey: ['entitytype' + entity.type], queryFn: () => monitoredEntitiesClient.getEntityType({ type: entity.type }) })


    let content;
    if (entityType) {
        console.log(metrics[entityType.dimensionKey])
        return (
            <Modal title={entity.displayName} show={"test"} onDismiss={() => setVisible(false)}>
                {content}

                <MetricDetailTable entity={entity} metricKeys={metrics[entityType.dimensionKey]} dimensionKey = {entityType.dimensionKey} ></MetricDetailTable>

            </Modal>


        )
    } else {
        return (
        <Modal title={entity.displayName} show={"test"} onDismiss={() => setVisible(false)}>
            <Skeleton width="100%" height="40px" />
        </Modal>
        );
    }
}