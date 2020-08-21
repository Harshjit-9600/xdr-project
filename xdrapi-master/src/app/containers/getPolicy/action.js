import {
  CALL_GET_POLICY_API,
  GET_POLICY_API_SUCCESS,
  GET_POLICY_API_FAILURE,
} from "./constants";

export function callGetPolicytAPI(data) {
  return {
    type: CALL_GET_POLICY_API,
    data,
  };
}
export function getPolicyAPISuccess(data) {
  return {
    type: GET_POLICY_API_SUCCESS,
    data,
  };
}
export function getPolicyAPIFailure(data) {
  return {
    type: GET_POLICY_API_FAILURE,
    data,
  };
}
