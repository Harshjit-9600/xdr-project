import produce from "immer";
import {
  GET_DISTRIBUTION_VERSION_API_SUCCESS,
  GET_DISTRIBUTION_VERSION_API_FAILURE,
  GET_DEVICE_VIOLATION_API_SUCCESS,
  GET_DEVICE_VIOLATION_API_FAILURE,
} from "./constants";

export const initialState = {
  getDistributionVersion: null,
  getDistributionVersionFailure: null,
  getDeviceViolation:null,
  getDeviceViolationFailure:null
};

const deviceControlReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    
    switch (action.type) {
      case GET_DISTRIBUTION_VERSION_API_SUCCESS:
        draft.getDistributionVersion = action.data;
        break;
      case GET_DISTRIBUTION_VERSION_API_FAILURE:
        draft.getDistributionVersionFailure = action.data;
        break;
        case GET_DEVICE_VIOLATION_API_SUCCESS:
        draft.getDeviceViolation = action.data;
        break;
        case GET_DEVICE_VIOLATION_API_FAILURE:
        draft.getDeviceViolationFailure = action.data;
        break;
        default:
        break;
    }
  });
export default deviceControlReducer;
