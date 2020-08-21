var axios = require("axios");

exports.getEndpoint = async function (req, res) {
  //Body
  // {
  //     "request_data":{}
  // }
  var data = JSON.stringify(req.body);
  var config = {
    method: "post",
    url: `${req.tenantURL}/public_api/v1/endpoints/get_endpoint/`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `${req.apiKey}`,
      "x-xdr-auth-id": req.authId,
    },
    data: data,
  };

  try {
    let result = await axios(config);
    res.status(200).json(result.data);
  } catch (error) {
    console.log("err", error);
    res.status(400).json(error);
  }
};

exports.getAllEndpoints = async function (req, res) {
  //Body
  // { }
  var data = JSON.stringify(req.body);
  var config = {
    method: "post",
    url: `${req.tenantURL}/public_api/v1/endpoints/get_endpoints`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `${req.apiKey}`,
      "x-xdr-auth-id": req.authId,
    },
    data: data,
  };

  try {
    let result = await axios(config);
    res.status(200).json(result.data);
  } catch (error) {
    console.log("err", error);
    res.status(400).json(error);
  }
};
