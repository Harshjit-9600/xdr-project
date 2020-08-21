import produce from "immer";
import { GET_POLICY_API_SUCCESS, GET_POLICY_API_FAILURE } from "./constants";

export const initialState = {
  getPolicy: null,
  getPolicyFailure: null,
  loading: false,
};

const getPolicyReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_POLICY_API_SUCCESS:
        draft.getPolicy = action.data;
        draft.getPolicyFailure = null;
        break;
      case GET_POLICY_API_FAILURE:
        draft.getPolicyFailure = action.data;
        draft.getPolicy = null;
        break;
      default:
        break;
    }
  });
export default getPolicyReducer;
