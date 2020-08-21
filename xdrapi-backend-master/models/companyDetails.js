const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companyDetailsSchema = new mongoose.Schema({
  tenantURL: { type: String },
  apiKey: { type: String },
  companyName: { type: String },
  authId: { type: Number},
});
module.exports = mongoose.model("companyDetails", companyDetailsSchema,"companyDetails");
