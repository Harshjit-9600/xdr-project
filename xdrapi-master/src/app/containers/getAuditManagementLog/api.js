import axios from "axios";
require("dotenv").config();

export const getAuditManagementLogApi= (values) => {
  return axios
    .post(`${process.env.REACT_APP_API_END_POINT}/getAuditManagementLogs`, values)
    .catch((error) => {
      return error.response;
    });
};
export const getAuditAgentReportsApi= (values) => {
  return axios
    .post(`${process.env.REACT_APP_API_END_POINT}/getAuditAgentReports`, values)
    .catch((error) => {
      return error.response;
    });
};