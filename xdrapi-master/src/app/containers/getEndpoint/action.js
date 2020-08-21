import {
  CALL_GET_ENDPOINT_API,
  GET_ENDPOINT_API_SUCCESS,
  GET_ENDPOINT_API_FAILURE,
  CALL_GET_ALL_ENDPOINT_API,
  GET_ALL_ENDPOINT_API_SUCCESS,
  GET_ALL_ENDPOINT_API_FAILURE,
} from "./constants";

export function callGetEndpointAPI(data) {
  
  return {
    type: CALL_GET_ENDPOINT_API,
    data,
  };
}
export function getEndpointAPISuccess(data) {
  return {
    type: GET_ENDPOINT_API_SUCCESS,
    data,
  };
  
}
export function getEndpointAPIFailure(data) {
  return {
    type: GET_ENDPOINT_API_FAILURE,
    data,
  };
}
export function callGetAllEndpointAPI(data) {
  return {
    type: CALL_GET_ALL_ENDPOINT_API,
    data,
  };
}
export function getAllEndpointAPISuccess(data) {
  return {
    type: GET_ALL_ENDPOINT_API_SUCCESS,
    data,
  };
}
export function getAllEndpointAPIFailure(data) {
  return {
    type: GET_ALL_ENDPOINT_API_FAILURE,
    data,
  };
}
