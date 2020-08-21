var axios = require("axios");

exports.getAuditManagementLogs = async function (req, res) {
  //Body
  // {
  //     "request_data":{ }
  // }'
  var data = JSON.stringify(req.body);
  var config = {
    method: "post",
    url: `${req.tenantURL}/public_api/v1/audits/management_logs/`,
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

exports.getAuditAgentReports = async function (req, res) {
  //Body
  // {
  //     "request_data":{ }
  // }'
  var data = JSON.stringify(req.body);
  var config = {
    method: "post",
    url: `${req.tenantURL}/public_api/v1/audits/agents_reports/`,
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
