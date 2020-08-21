import {
  CALL_GET_SCRIPTS_API,
  CALL_GET_SCRIPT_METADATA_API,
  GET_SCRIPTS_API_SUCCESS,
  GET_SCRIPTS_API_FAILURE,
  GET_SCRIPT_METADATA_API_SUCCESS,
  GET_SCRIPT_METADATA_API_FAILURE,
  CALL_GET_SCRIPT_CODE_API,
  GET_SCRIPT_CODE_API_SUCCESS,
  GET_SCRIPT_CODE_API_FAILURE,
} from "./constants";

export function callGetScriptsAPI(data) {
  return {
    type: CALL_GET_SCRIPTS_API,
    data,
  };
}
export function callGetScriptMetadataAPI(data) {
  return {
    type: CALL_GET_SCRIPT_METADATA_API,
    data,
  };
}
export function callGetScriptCodeAPI(data) {
  return {
    type: CALL_GET_SCRIPT_CODE_API,
    data,
  };
}
export function getScriptsSuccess(data) {
  return {
    type: GET_SCRIPTS_API_SUCCESS,
    data,
  };
}
export function getScriptsAPIFailure(data) {
  return {
    type: GET_SCRIPTS_API_FAILURE,
    data,
  };
}
export function getScriptMetadatAPISuccess(data) {
  return {
    type: GET_SCRIPT_METADATA_API_SUCCESS,
    data,
  };
}
export function getScriptsMetadataAPIFailure(data) {
  return {
    type: GET_SCRIPT_METADATA_API_FAILURE,
    data,
  };
}
export function getScriptCodeAPISuccess(data) {
  return {
    type: GET_SCRIPT_CODE_API_SUCCESS,
    data,
  };
}
export function getScriptCodeAPIFailure(data) {
  return {
    type: GET_SCRIPT_CODE_API_FAILURE,
    data,
  };
}
