import axios from "axios";
require("dotenv").config();

export const getPolicyAPI = (values) => {
  return axios
    .post(`${process.env.REACT_APP_API_END_POINT}/getPolicy`, values)
    .catch((error) => {
      return error.response;
    });
};
