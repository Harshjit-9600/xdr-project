import { takeLatest, put, call } from "redux-saga/effects";
import { CALL_GET_ENDPOINT_API, CALL_GET_ALL_ENDPOINT_API } from "./constants";
import { getEndpointAPI, getAllEndpointAPI } from "./api";
import {
  getEndpointAPISuccess,
  getEndpointAPIFailure,
  getAllEndpointAPISuccess,
  getAllEndpointAPIFailure,
} from "./action";
import { setLoading } from "../getIncidents/actions";
export function* getEndpoint(data) {
  
  let body = {
    request_data: {},
    companyId: data.data.companyId
  };
  try {
    const response = yield call(getEndpointAPI, body);
    
    if (response.status === 200) {
      yield put(getEndpointAPISuccess(response.data.reply.endpoints));
    } else {
      yield put(getEndpointAPIFailure(response.statusText));
    }
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}
export function* getAllEndpoint(data) {
  let body = {
    companyId: data.data.companyId
  };
  try {
    const response = yield call(getAllEndpointAPI, body);
    if (response.status === 200) {
      yield put(getAllEndpointAPISuccess(response.data.reply));
    } else {
      yield put(getAllEndpointAPIFailure(response.statusText));
    }
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}
export const getEndpointSaga = [
  takeLatest(CALL_GET_ENDPOINT_API, getEndpoint),
  takeLatest(CALL_GET_ALL_ENDPOINT_API, getAllEndpoint),
];
