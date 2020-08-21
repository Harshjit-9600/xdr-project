var axios = require("axios");

exports.getQuarantineStatus = async function (req, res) {
  //Body
  // {
  //   "request_data": {
  //       "files": [
  //           {   "endpoint_id": "51888e4ce9214c63b39d054bd073b93a",
  //               "file_path": "C:\\Users\\XDR\\Desktop\\test_x64.msi",
  //               "file_hash": "8D8508904334A304D2CC2375B393E59BBBC78C9C5903B8B23C5095F6D75"
  //           }
  //       ]
  // }
  var data = JSON.stringify(req.body);
  var config = {
    method: "post",
    url: `${req.tenantURL}/public_api/v1/quarantine/status/`,
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
