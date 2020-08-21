import produce from "immer";
import {
  GET_AUDIT_MANAGEMENT_LOG_API_SUCCESS,
  GET_AUDIT_MANAGEMENT_LOG_API_FAILURE,
  GET_AUDIT_AGENT_REPORTS_API_SUCCESS,
  GET_AUDIT_AGENT_REPORTS_API_FAILURE,
} from "./constants";

export const initialState = {
  getAuditManagementLog: [],
  getAuditManagementLogFailure: null,
  getAuditAgentReports: [],
  getAuditAgentReportsFailure: null,

  loading: false,
};

const getAuditManagementLogReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_AUDIT_MANAGEMENT_LOG_API_SUCCESS:
        draft.getAuditManagementLog = action.data;
        break;
      case GET_AUDIT_MANAGEMENT_LOG_API_FAILURE:
        draft.getAuditManagementLogFailure = action.data;
        break;
      case GET_AUDIT_AGENT_REPORTS_API_SUCCESS:
        draft.getAuditAgentReports = action.data;
        break;
      case GET_AUDIT_AGENT_REPORTS_API_FAILURE:
        draft.getAuditAgentReportsFailure = action.data;
        break;
      default:
        break;
    }
  });
export default getAuditManagementLogReducer;
