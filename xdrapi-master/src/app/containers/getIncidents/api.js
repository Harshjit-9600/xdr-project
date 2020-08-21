import axios from "axios";
require("dotenv").config();

export const getIncidentsAPI = (values) => {
  return axios
    .post(`${process.env.REACT_APP_API_END_POINT}/getIncidents`, values)
    .catch((error) => {
      return error.response;
    });
};
export const getExtraIncidentsAPI = (values) => {
  return axios
    .post(`${process.env.REACT_APP_API_END_POINT}/getExtraIncidentData`, values)
    .catch((error) => {
      return error.response;
    });
};
export const getCompanyListAPI = () => {
  return axios
    .get(`${process.env.REACT_APP_API_END_POINT}/getAllCompanyList`)
    .catch((error) => {
      return error.response;
    });
};

export const addCompanyAPI = (values) => {
  return axios
    .post(`${process.env.REACT_APP_API_END_POINT}/addCompanyDetails`, values)
    .catch((error) => {
      return error.response;
    });
};

export const deleteCompanyAPI = (values) => {
  return axios
    .post(`${process.env.REACT_APP_API_END_POINT}/deleteCompany`, values)
    .catch((error) => {
      return error.response;
    });
};
