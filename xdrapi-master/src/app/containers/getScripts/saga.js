import { takeLatest, put, call } from "redux-saga/effects";
import {
  CALL_GET_SCRIPTS_API,
  CALL_GET_SCRIPT_METADATA_API,
  CALL_GET_SCRIPT_CODE_API,
} from "./constants";
import { getScriptsAPI, getScriptMetadataAPI, getScriptCodeAPI } from "./api";
import {
  getScriptsSuccess,
  getScriptsAPIFailure,
  getScriptMetadatAPISuccess,
  getScriptsMetadataAPIFailure,
  getScriptCodeAPISuccess,
  getScriptCodeAPIFailure,
} from "./action";
import { setLoading } from "../getIncidents/actions";
export function* getScripts(data) {
  let body = {
    request_data: {}, 
    companyId: data.data.companyId
  };
  try {
    const response = yield call(getScriptsAPI, body);
      if (response.status === 200) {
      yield put(getScriptsSuccess(response.data.reply.scripts));
    } else {
      yield put(getScriptsAPIFailure(response.statusText));
    }
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}
export function* getScriptMetadata(data) {
  
  let body = {
    request_data: {
      script_uid:data.data.scriptMetadata,
    },companyId: data.data.companyId
  };
  try {
    const response = yield call(getScriptMetadataAPI, body);
    
    if (response.status === 200) {
      yield put(getScriptMetadatAPISuccess(response.data.reply));
    } else {
      yield put(getScriptsMetadataAPIFailure(response.statusText));
    }
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}
export function* getScriptCode(data) {
  let body = {
    request_data: {
      script_uid: data.data.selectedIncident,
    },companyId: data.data.companyId
  };
  try {
    const response = yield call(getScriptCodeAPI, body);
    if (response.status === 200) {
      yield put(getScriptCodeAPISuccess(response.data.reply));
    } else {
      yield put(getScriptCodeAPIFailure(response.statusText));
    }
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}

export const getScriptsSaga = [
  takeLatest(CALL_GET_SCRIPTS_API, getScripts),
  takeLatest(CALL_GET_SCRIPT_METADATA_API, getScriptMetadata),
  takeLatest(CALL_GET_SCRIPT_CODE_API, getScriptCode),
];
