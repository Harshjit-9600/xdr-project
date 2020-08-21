import produce from "immer";
import {
  GET_INCIDENTS_API_SUCCESS,
  GET_INCIDENTS_API_FAILURE,
  GET_EXTRAINCIDENTS_API_SUCCESS,
  GET_EXTRAINCIDENTS_API_FAILURE,
  GET_COMPANY_LIST_API_SUCCESS,
  GET_COMPANY_LIST_API_FAILURE,
  SET_LOADING,
  SET_SELECTED_API,
  ADD_COMPANY,
  REMOVE_COMPANY,
} from "./constants";

export const initialState = {
  selectedAPI: "ADMIN",
  getIncident: [],
  getCompanyList: [],
  getCompanyListFailure: null,
  getIncidentFailure: null,
  getExtraIncident: null,
  getExtraIncidentAlert: [],
  getExtraIncidentnetwork_artifacts: [],
  getExtraIncidentfileartifacts: [],
  getExtraIncidentFailure: null,
  loading: false,
};

const getIncidentReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_SELECTED_API:
        draft.selectedAPI = action.data;
        break;
      case SET_LOADING:
        draft.loading = action.data;
        break;
      case GET_INCIDENTS_API_SUCCESS:
        draft.getIncident = action.data;
        break;
      case GET_INCIDENTS_API_FAILURE:
        draft.getIncidentFailure = action.data;
        break;
      case GET_EXTRAINCIDENTS_API_SUCCESS:
        draft.getExtraIncident = action.data.incident;
        draft.getExtraIncidentAlert = action.data.alerts.data;
        draft.getExtraIncidentnetwork_artifacts =
          action.data.network_artifacts.data;
        draft.getExtraIncidentfileartifacts = action.data.file_artifacts.data;
        break;
      case GET_EXTRAINCIDENTS_API_FAILURE:
        draft.getIncidentFailure = action.data;
        break;
      case GET_COMPANY_LIST_API_SUCCESS:
        draft.getCompanyList = action.data;
        break;
      case GET_COMPANY_LIST_API_FAILURE:
        draft.getCompanyListFailure = action.data;
        break;
      case REMOVE_COMPANY:
        draft.getCompanyList = draft.getCompanyList.filter((company) => {
          return company._id !== action.data._id;
        });
        break;
      case ADD_COMPANY:
        draft.getCompanyList = draft.getCompanyList.concat(action.data);
        break;
      default:
        break;
    }
  });
export default getIncidentReducer;
