let companyDetailsModel = require("../models/companyDetails");

exports.addCompanyDetails = async function (req, res) {
  try {
    if (!req.body.tenantURL) {
      return res.status(400).send({
        message: "Pass proper payload.",
        error: "Parameter tenantURL missing.",
      });
    }
    if (!req.body.apiKey) {
      return res.status(400).send({
        message: "Pass proper payload.",
        error: "Parameter apiKey missing.",
      });
    }
    if (!req.body.companyName) {
      return res.status(400).send({
        message: "Pass proper payload.",
        error: "Parameter companyName missing.",
      });
    }
    // let companyExists = await companyDetailsModel.findOne({
    //   tenantURL: req.body.tenantURL,
    // });
    // if (companyExists) {
    //   return res.status(400).send({
    //     message: "Company already exists.",
    //     error: "Duplicate companies not allowed.",
    //   });
    // }
    let newCompanyDetails = await companyDetailsModel.create(req.body);
    return res
      .status(200)
      .json({ data: newCompanyDetails, message: "success" });
  } catch (err) {
    console.log("Err", err);
    return res
      .status(400)
      .send({ message: "Something went wrong.", error: err });
  }
};

exports.getCompanyDetails = async function (req, res) {
  try {
    if (!req.query.companyId) {
      return res.status(400).send({
        message: "Pass proper parameters.",
        error: "Parameter companyId missing.",
      });
    }
    let companyDetails = await companyDetailsModel.findOne({
      _id: req.query.companyId,
    });
    return res.status(200).json({ data: companyDetails, message: "success" });
  } catch (err) {
    console.log("Err", err);
    return res
      .status(400)
      .send({ message: "Something went wrong.", error: err });
  }
};

exports.getAllCompanyList = async function (req, res) {
  try {
    let companyList = await companyDetailsModel.find({});
    return res.status(200).json({ data: companyList, message: "success" });
  } catch (err) {
    console.log("Err", err);
    return res
      .status(400)
      .send({ message: "Something went wrong.", error: err });
  }
};

exports.deleteCompany = async function (req, res) {
  try {
    if (!req.body.companyId) {
      return res.status(400).send({
        message: "Pass proper parameters.",
        error: "Parameter companyId missing.",
      });
    }
    let removedCompany = await companyDetailsModel.findOneAndRemove({
      _id: req.body.companyId,
    });
    return res.status(200).json({ data: removedCompany, message: "success" });
  } catch (err) {
    console.log("Err", err);
    return res
      .status(400)
      .send({ message: "Something went wrong.", error: err });
  }
};
