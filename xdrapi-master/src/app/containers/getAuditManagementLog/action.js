import {
     CALL_AUDIT_MANAGEMENT_LOG_API,
     CALL_AUDIT_AGENT_REPORTS_API,
    GET_AUDIT_MANAGEMENT_LOG_API_SUCCESS,
    GET_AUDIT_MANAGEMENT_LOG_API_FAILURE,
    GET_AUDIT_AGENT_REPORTS_API_SUCCESS,
    GET_AUDIT_AGENT_REPORTS_API_FAILURE,

} from "./constants";
  
  
 
  export function callAuditManagementLogAPI(data) {
    return {
      type: CALL_AUDIT_MANAGEMENT_LOG_API,
      data,
    };
  }
  export function callAuditAgentReportsAPI(data) {
    return {
      type: CALL_AUDIT_AGENT_REPORTS_API,
      data,
    };
  }
  export function getAuditManagementLogAPISuccess(data) {
  
    return {
      type: GET_AUDIT_MANAGEMENT_LOG_API_SUCCESS,
      data,
    };
  }
  export function getAuditManagementLogAPIFailure(data) {
    return {
      type: GET_AUDIT_MANAGEMENT_LOG_API_FAILURE,
      data,
    };
  }
  export function getAuditAgentReportsAPISuccess(data) {
  
    return {
      type: GET_AUDIT_AGENT_REPORTS_API_SUCCESS,
      data,
    };
  }
  export function  getAuditAgentReportsAPIFailure(data) {
    return {
      type:  GET_AUDIT_AGENT_REPORTS_API_FAILURE,
      data,
    };
  }