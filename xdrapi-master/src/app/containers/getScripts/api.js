import axios from "axios";
require("dotenv").config();

export const getScriptsAPI = (values) => {
  return axios
    .post(`${process.env.REACT_APP_API_END_POINT}/getScripts`, values)
    .catch((error) => {
      return error.response;
    });
};
export const getScriptMetadataAPI = (values) => {
  return axios
    .post(`${process.env.REACT_APP_API_END_POINT}/getScriptMetadata`, values)
    .catch((error) => {
      return error.response;
    });
};
export const getScriptCodeAPI = (values) => {
  return axios
    .post(`${process.env.REACT_APP_API_END_POINT}/getScriptCode`, values)
    .catch((error) => {
      return error.response;
    });
};