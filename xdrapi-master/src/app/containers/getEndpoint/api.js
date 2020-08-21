import axios from "axios";
require("dotenv").config();

export const getEndpointAPI = (values) => {
  return axios
    .post(`${process.env.REACT_APP_API_END_POINT}/getEndpoint`, values)
    .catch((error) => {
      return error.response;
    });
};

export const getAllEndpointAPI = (values) => {
  return axios
    .post(`${process.env.REACT_APP_API_END_POINT}/getAllEndpoints`, values)
    .catch((error) => {
      return error.response;
    });
};
