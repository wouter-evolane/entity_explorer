import React, { Component } from 'react'
import { getPropertiesForEntity } from "../utils/Entity"

export default entityDetail = (selectedEntity, entityChange) => {
    var props = getPropertiesForEntity(selectedEntity)

    return {props}

}