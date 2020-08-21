import { takeLatest, put, call } from "redux-saga/effects";
import {
  CALL_AUDIT_MANAGEMENT_LOG_API,
  CALL_AUDIT_AGENT_REPORTS_API,
} from "./constants";
import { getAuditManagementLogApi, getAuditAgentReportsApi } from "./api";
import {
  getAuditManagementLogAPISuccess,
  getAuditManagementLogAPIFailure,
  getAuditAgentReportsAPISuccess,
  getAuditAgentReportsAPIFailure,
} from "./action";
import { setLoading } from "../getIncidents/actions";
export function* getAuditManagementLog(data) {
  let body = {
    request_data: {},
    companyId: data.data.companyId
  };
  try {
    const response = yield call(getAuditManagementLogApi, body);

    if (response.status === 200) {
      yield put(getAuditManagementLogAPISuccess(response.data.reply.data));
    } else {
      yield put(getAuditManagementLogAPIFailure(response.statusText));
    }
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}
export function* getAuditAgentReports(data) {
  let body = {
    request_data: {},
    companyId: data.data.companyId
  };
  try {
    const response = yield call(getAuditAgentReportsApi, body);

    if (response.status === 200) {
      yield put(getAuditAgentReportsAPISuccess(response.data.reply.data));
    } else {
      yield put(getAuditAgentReportsAPIFailure(response.statusText));
    }
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}

export const getAuditManagementLogSaga = [
  takeLatest(CALL_AUDIT_MANAGEMENT_LOG_API, getAuditManagementLog),
  takeLatest(CALL_AUDIT_AGENT_REPORTS_API, getAuditAgentReports),
];
