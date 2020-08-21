let companyDetailsModel = require("../models/companyDetails");

exports.sessionMiddleware = async (req, res, next) => {
  if (!req.body.companyId) {
    return res.status(400).send({
      message: "Pass proper payload.",
      error: "Parameter companyId missing.",
    });
  }
  if (req.session[req.body.companyId]) {
    console.log(">>>>>>>>>>>> In if", req.session[req.body.companyId]);
    req.tenantURL = req.session[req.body.companyId].tenantURL;
    req.apiKey = req.session[req.body.companyId].apiKey;
    req.authId = req.session[req.body.companyId].authId;
    delete req.body.companyId;
    next();
  } else {
    //fetch from db and next()
    console.log(">>>>>>else session");
    let companyDetails = await companyDetailsModel.findOne({
      _id: req.body.companyId,
    });
    if (!companyDetails) {
      return res.status(400).send({
        message: "Incorrect parameter.",
        error: "Company doesn't exists.",
      });
    }
    req.session[req.body.companyId] = companyDetails;
    req.tenantURL = req.session[req.body.companyId].tenantURL;
    req.apiKey = req.session[req.body.companyId].apiKey;
    req.authId = req.session[req.body.companyId].authId;
    delete req.body.companyId;
    next();
  }
};
