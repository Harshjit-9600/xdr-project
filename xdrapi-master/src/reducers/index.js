import { combineReducers } from "redux";
import getIncidentReducer from "../app/containers/getIncidents/reducer";
import getEndpointReducer from "../app/containers/getEndpoint/reducer";

import getPolicyReducer from "../app/containers/getPolicy/reducer";
import getAuditManagementLogReducer from "../app/containers/getAuditManagementLog/reducer";
import getScriptsReducer from "../app/containers/getScripts/reducer";
import deviceControlReducer from "../app/containers/getDeviceControl/reducer";
import { connectRouter } from "connected-react-router";

const rootReducer = (history) =>
  combineReducers({
    getIncidentReducer: getIncidentReducer,
    getEndpointReducer: getEndpointReducer,
    deviceControlReducer: deviceControlReducer,
    getPolicyReducer: getPolicyReducer,
    getAuditManagementLogReducer: getAuditManagementLogReducer,
    getScriptsReducer: getScriptsReducer,
    router: connectRouter(history),
  });

export default rootReducer;
