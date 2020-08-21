import {
  CALL_GET_DISTRIBUTION_VERSION_API,
  GET_DISTRIBUTION_VERSION_API_SUCCESS,
  GET_DISTRIBUTION_VERSION_API_FAILURE,
  CALL_GET_DEVICE_VIOLATION_API,
  GET_DEVICE_VIOLATION_API_SUCCESS,
  GET_DEVICE_VIOLATION_API_FAILURE,
} from "./constants";

export function callGetDistributionVersionAPI(data) {
  return {
    type: CALL_GET_DISTRIBUTION_VERSION_API,
    data,
  };
}
export function callGetDeviceViolationAPI(data) {
  
  return {
    type: CALL_GET_DEVICE_VIOLATION_API,
    data,
  };
}
export function getDistributionVersionAPISuccess(data) {
  return {

    type: GET_DISTRIBUTION_VERSION_API_SUCCESS,
    data,
  };
}
export function getDistributionVersionAPIFailure(data) {
  return {
    type: GET_DISTRIBUTION_VERSION_API_FAILURE,
    data,
  };
}
export function getDeviceViolationAPISuccess(data) {
  
  return {
    type: GET_DEVICE_VIOLATION_API_SUCCESS,
    data,
  };
}
export function getDeviceViolationAPIFailure(data) {
  return {
    type: GET_DEVICE_VIOLATION_API_FAILURE,
    data,
  };
}