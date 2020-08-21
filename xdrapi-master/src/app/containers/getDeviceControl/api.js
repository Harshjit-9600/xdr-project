import axios from "axios";
require("dotenv").config();

export const getDistributionVersionAPI = (values) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_END_POINT}/getDistributionVersion`,
      values
    )
    .catch((error) => {
      return error.response;
    });
};
export const getDeviceViolationAPI= (values) => {
  
  return axios
    .post(
      `${process.env.REACT_APP_API_END_POINT}/getViolations`,
      values
    )
    .catch((error) => {
      return error.response;
    });
};