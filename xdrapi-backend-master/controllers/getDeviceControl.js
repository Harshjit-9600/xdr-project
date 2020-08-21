var axios = require("axios");

exports.getViolations = async function (req, res) {
  //Body
  // {
  //     "request_data":{
  //        "filters":[
  //           {
  //              "field":"type",
  //              "operator":"in",
  //              "value":[
  //                 "disk drivE"
  //              ]
  //           }
  //        ],
  //        "search_to":1
  // }'
  var data = JSON.stringify(req.body);
  var config = {
    method: "post",
    url: `${req.tenantURL}/public_api/v1/device_control/get_violations/`,
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
    console.log(result);
    res.status(200).json(result.data);
  } catch (error) {
    console.log("err", error);
    res.status(400).json(error);
  }
};

exports.getDistributionVersion = async function (req, res) {
  //Body
  // { }
  var data = JSON.stringify(req.body);
  var config = {
    method: "post",
    url: `${req.tenantURL}/public_api/v1/distributions/get_versions/`,
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

exports.getDistributionStatus = async function (req, res) {
  //Body
  // {
  //    "request_data":{
  //     "distribution_id":"26748677e9f44104b14bfee0aac4eb20"
  //  }
  var data = JSON.stringify(req.body);
  var config = {
    method: "post",
    url: `${req.tenantURL}/public_api/v1/distributions/get_status/`,
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
    console.log(result);
    res.status(200).json(result.data);
  } catch (error) {
    console.log("err", error);
    res.status(400).json(error);
  }
};

exports.getDistributionURL = async function (req, res) {
  //Body
  // {
  //    "request_data":{
  //     "distribution_id":"849fbe9ca2e74d3eb9423bb67bb80c15",
  //     "package_type":"x86"
  //     }
  //  }
  var data = JSON.stringify(req.body);
  var config = {
    method: "post",
    url: `${req.tenantURL}/public_api/v1/distributions/get_dist_url/`,
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
