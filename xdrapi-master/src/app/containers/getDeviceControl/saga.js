import { takeLatest, put, call } from "redux-saga/effects";
import { CALL_GET_DISTRIBUTION_VERSION_API,CALL_GET_DEVICE_VIOLATION_API } from "./constants";
import { getDistributionVersionAPI ,getDeviceViolationAPI} from "./api";
import {
  getDistributionVersionAPISuccess,
  getDistributionVersionAPIFailure,
  getDeviceViolationAPISuccess,
  getDeviceViolationAPIFailure,
} from "./actions";
import { setLoading } from "../getIncidents/actions";
export function* getDistributionVersion() {
  let body = {};
  try {
    const response = yield call(getDistributionVersionAPI, body);
    if (response.status === 200) {
      yield put(getDistributionVersionAPISuccess(response.data.reply));
    } else {
      yield put(getDistributionVersionAPIFailure(response.statusText));
    }
    yield put(setLoading(true));
  } catch (error) {
    console.log(error);
  }
}
export function* getDeviceViolation(data) {
  let body = {
    "request_data":{
             "filters":[
                {
                   "field":"type",
                   "operator":"in",
                   "value":[
                      "disk drivE"
                   ]
                }
             ],
             "search_to":1
      },
      companyId: data.data
  };  
  try {
    const response = yield call(getDeviceViolationAPI, body);
    
    if (response.status === 200) {
      yield put(getDeviceViolationAPISuccess(response.data.reply.violations));
    } else {
      yield put(getDeviceViolationAPIFailure(response.statusText));
    }
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}

export const deviceControlSaga = [
  takeLatest(CALL_GET_DISTRIBUTION_VERSION_API, getDistributionVersion),
  takeLatest(CALL_GET_DEVICE_VIOLATION_API, getDeviceViolation),
];
