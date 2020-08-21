import { all } from "redux-saga/effects";
import { getIncidentSaga } from "../app/containers/getIncidents/saga";
import { getEndpointSaga } from "../app/containers/getEndpoint/saga";
import { getAuditManagementLogSaga } from "../app/containers/getAuditManagementLog/saga";
import { getPolicySaga } from "../app/containers/getPolicy/saga";
import { getScriptsSaga } from "../app/containers/getScripts/saga";
import { deviceControlSaga } from "../app/containers/getDeviceControl/saga";
// import { signUp } from "../src/signup/saga";
//import { AdminSaga } from "../src/admin/saga";
function* rootSaga() {
  yield all([...getIncidentSaga, ...getEndpointSaga, ...deviceControlSaga,...getPolicySaga,...getAuditManagementLogSaga,...getScriptsSaga]);
}

export default rootSaga;
