import { takeLatest, put, call } from "redux-saga/effects";
import {
  CALL_GET_INCIDENTS_API,
  CALL_GET_EXTRAINCIDENTS_API,
  CALL_GET_COMPANY_LIST_API,
} from "./constants";
import { getIncidentsAPI, getExtraIncidentsAPI,getCompanyListAPI } from "./api";
import {
  getIncidentsAPISuccess,
  getIncidentsAPIFailure,
  getExtraIncidentsAPISuccess,
  getExtraIncidentsAPIFailure,
  getCompanyListAPISuccess,
  getCompanyListAPIFailure,
  setLoading,
} from "./actions";

export function* getIncidents(data) {
  let body = {
   request_data: {},
    companyId: data.data
  };
  try {
    const response = yield call(getIncidentsAPI, body);
    ;
    if (response.status === 200) {
      yield put(getIncidentsAPISuccess(response.data.reply.incidents));
    } else {
      yield put(getIncidentsAPIFailure(response.statusText));
    }
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}

export function* getExtraIncidents(data) {
  let body = {
    request_data: {
      incident_id: data.data.extraIncident
     },companyId: data.data.companyId
  };
   try {
    const response = yield call(getExtraIncidentsAPI, body);
    if (response.status === 200) {
      yield put(getExtraIncidentsAPISuccess(response.data.reply));
    } else {
      yield put(getExtraIncidentsAPIFailure(response.statusText));
    }
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}
export function* getCompanyList(data) {
  try {
    const response = yield call(getCompanyListAPI);
    if (response.status === 200) {
      yield put(getCompanyListAPISuccess(response.data.data));
    } else {
      yield put(getCompanyListAPIFailure(response.statusText));
    }
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}

export const getIncidentSaga = [
  takeLatest(CALL_GET_INCIDENTS_API, getIncidents),
  takeLatest(CALL_GET_EXTRAINCIDENTS_API, getExtraIncidents),
  takeLatest(CALL_GET_COMPANY_LIST_API, getCompanyList),
];
