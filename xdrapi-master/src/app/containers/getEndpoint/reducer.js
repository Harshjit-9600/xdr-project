import produce from "immer";
import {
  GET_ENDPOINT_API_SUCCESS,
  GET_ENDPOINT_API_FAILURE,
  GET_ALL_ENDPOINT_API_SUCCESS,
  GET_ALL_ENDPOINT_API_FAILURE,
} from "./constants";

export const initialState = {
  getEndpoint: [],
  getAllEndpoint: [],
  getAllEndpointFailure: null,
  getEndpointFailure: null,
};  

const getEndpointReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    
    switch (action.type) {
      case GET_ENDPOINT_API_SUCCESS:
        draft.getEndpoint = action.data;
        break;
      case GET_ENDPOINT_API_FAILURE:
        draft.getEndpointFailure = action.data;
        break;
      case GET_ALL_ENDPOINT_API_SUCCESS:
        draft.getAllEndpoint = action.data;
      break;
      case GET_ALL_ENDPOINT_API_FAILURE:
        draft.getAllEndpointFailure = action.data;
        break;
      default:
        break;
    }
  });
export default getEndpointReducer;
