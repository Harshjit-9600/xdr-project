let middleware = require("./middleware/sessionMiddleware");
var getIncidentsController = require("./controllers/getIncidents");
var getEndpointController = require("./controllers/getEndpoints");
var getPolicyController = require("./controllers/getPolicy");
var getQuarantineController = require("./controllers/getQuarantine");
var getDeviceController = require("./controllers/getDeviceControl");
var getAuditManagement = require("./controllers/getAuditManagement");
var getScript = require("./controllers/getScripts");
var companyDetails = require("./controllers/companyDetails");

module.exports = function (app) {
  app.post("/addCompanyDetails", companyDetails.addCompanyDetails);
  app.get("/getCompanyDetails", companyDetails.getCompanyDetails);
  app.get("/getAllCompanyList", companyDetails.getAllCompanyList);
  app.post("/deleteCompany", companyDetails.deleteCompany);
  app.post(
    "/getIncidents",
    middleware.sessionMiddleware,
    getIncidentsController.getIncidents
  );
  app.post(
    "/getExtraIncidentData",
    middleware.sessionMiddleware,
    getIncidentsController.getExtraIncidentData
  );
  app.post(
    "/getEndpoint",
    middleware.sessionMiddleware,
    getEndpointController.getEndpoint
  );
  app.post(
    "/getAllEndpoints",
    middleware.sessionMiddleware,
    getEndpointController.getAllEndpoints
  );
  app.post(
    "/getPolicy",
    middleware.sessionMiddleware,
    getPolicyController.getPolicy
  );
  app.post(
    "/getQuarantineStatus",
    middleware.sessionMiddleware,
    getQuarantineController.getQuarantineStatus
  );
  app.post(
    "/getViolations",
    middleware.sessionMiddleware,
    getDeviceController.getViolations
  );
  app.post(
    "/getDistributionVersion",
    middleware.sessionMiddleware,
    getDeviceController.getDistributionVersion
  );
  app.post(
    "/getDistributionStatus",
    middleware.sessionMiddleware,
    getDeviceController.getDistributionStatus
  );
  app.post(
    "/getDistributionURL",
    middleware.sessionMiddleware,
    getDeviceController.getDistributionURL
  );
  app.post(
    "/getAuditManagementLogs",
    middleware.sessionMiddleware,
    getAuditManagement.getAuditManagementLogs
  );
  app.post(
    "/getAuditAgentReports",
    middleware.sessionMiddleware,
    getAuditManagement.getAuditAgentReports
  );
  app.post("/getScripts", middleware.sessionMiddleware, getScript.getScripts);
  app.post(
    "/getScriptMetadata",
    middleware.sessionMiddleware,
    getScript.getScriptMetadata
  );
  app.post(
    "/getScriptExecutionStatus",
    middleware.sessionMiddleware,
    getScript.getScriptExecutionStatus
  );
  app.post(
    "/getScriptExecutionResults",
    middleware.sessionMiddleware,
    getScript.getScriptExecutionResults
  );
  app.post(
    "/getScriptCode",
    middleware.sessionMiddleware,
    getScript.getScriptCode
  );
};
