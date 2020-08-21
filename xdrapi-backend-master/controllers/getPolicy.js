var axios = require("axios");

exports.getPolicy = async function (req, res) {
  //Body
  // {
  //    "request_data":{
  //     "endpoint_id":"51588e4ce9214c63b39d054bd073b93a"
  //  }
  var data = JSON.stringify(req.body);
  var config = {
    method: "post",
    url: `${req.tenantURL}/public_api/v1/endpoints/get_policy/`,
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
