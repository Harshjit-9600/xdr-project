import {
  SET_SELECTED_API,
  CALL_GET_INCIDENTS_API,
  GET_INCIDENTS_API_SUCCESS,
  GET_INCIDENTS_API_FAILURE,
  CALL_GET_EXTRAINCIDENTS_API,
  CALL_GET_COMPANY_LIST_API,
  GET_EXTRAINCIDENTS_API_SUCCESS,
  GET_EXTRAINCIDENTS_API_FAILURE,
  GET_COMPANY_LIST_API_SUCCESS,
  GET_COMPANY_LIST_API_FAILURE,
  SET_LOADING,
  ADD_COMPANY,
  REMOVE_COMPANY,
} from "./constants";

export function setSelectedAPI(data) {
  return {
    type: SET_SELECTED_API,
    data,
  };
}
export function setLoading(data) {
  return {
    type: SET_LOADING,
    data,
  };
}
export function callGetIncidentsAPI(data) {
  return {
    type: CALL_GET_INCIDENTS_API,
    data,
  };
}
export function callGetCompanyList() {
  return {
    type: CALL_GET_COMPANY_LIST_API,
  };
}
export function callGetExtraIncidentsAPI(data) {
  return {
    type: CALL_GET_EXTRAINCIDENTS_API,
    data,
  };
}
export function getIncidentsAPISuccess(data) {
  return {
    type: GET_INCIDENTS_API_SUCCESS,
    data,
  };
}
export function getIncidentsAPIFailure(data) {
  return {
    type: GET_INCIDENTS_API_FAILURE,
    data,
  };
}
export function getExtraIncidentsAPISuccess(data) {
  return {
    type: GET_EXTRAINCIDENTS_API_SUCCESS,
    data,
  };
}
export function getExtraIncidentsAPIFailure(data) {
  return {
    type: GET_EXTRAINCIDENTS_API_FAILURE,
    data,
  };
}
export function getCompanyListAPISuccess(data) {
  return {
    type: GET_COMPANY_LIST_API_SUCCESS,
    data,
  };
}
export function getCompanyListAPIFailure(data) {
  return {
    type: GET_COMPANY_LIST_API_FAILURE,
    data,
  };
}

export function removeCompany(data) {
  return {
    type: REMOVE_COMPANY,
    data,
  };
}
export function addCompany(data) {
  return {
    type: ADD_COMPANY,
    data,
  };
}
