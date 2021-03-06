var axios = require("axios");

exports.getIncidents = async function (req, res) {
  // {   //Body
  //   "request_data":{ }
  // }
  var data = JSON.stringify(req.body);
  var config = {
    method: "post",
    url: `${req.tenantURL}/public_api/v1/incidents/get_incidents/`,
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

exports.getExtraIncidentData = async function (req, res) {
  //Body requires incidentId
  // {
  //   "request_data":{
  //      "incident_id":"492",
  //      "alerts_limit":5
  // }
  var data = JSON.stringify(req.body);
  var config = {
    method: "post",
    url: `${req.tenantURL}/public_api/v1/incidents/get_incident_extra_data/`,
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
