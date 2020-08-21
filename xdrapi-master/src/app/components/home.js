import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";
import ResponsiveDrawer from "./Drawer";
import Header from "./Header";
import IncidentTable from "./IncidentTable";
import ExtraIncidentTable from "./GetExtraIncidentsTable";
import EndpointTable from "./EndpointTable";
import AllEndpointTable from "./AllEndpointTable";
import GetPolicy from "./GetPolicyTable";
import GetScripts from "./GetScriptsTable";
import GetScriptCodeTable from "./GetScriptCodeTable";
import GetScriptMetdataTable from "./GetScriptMetadataTable";
import GetAuditManagementLogTable from "./GetAuditManagementLogTable";
import GetAuditAgentReportsTable from "./GetAuditAgentReportsTable";
//import DistributionVersionTable from "./DistributionVersionTable";
import Admin from "./admin";
import GetDeviceViolationTable from "./GetDeviceViolationTable";
import Grid from "@material-ui/core/Grid";
import { callGetCompanyList } from "../containers/getIncidents/actions";

import { connect } from "react-redux";
import { AccordionDetails } from "@material-ui/core";

const useStyles = makeStyles({
  hero: {
    marginTop: "100px",
    marginLeft: "300px",
    width: "70%",
  },
  loader: {
    margin: "200px auto",
  },
});

function Home(props) {
  const classes = useStyles();
  const [company, setCompany] = useState(null);
  const handleCompany = (details) => {
    setCompany(details);
  };
  useEffect(() => {
    if (props.getCompanyList.length == 0) {
      props.callGetCompanyList();
    }
  }, []);
  const renderComponent = (apiName) => {
    switch (apiName) {
      case "ADMIN":
        return <Admin />;
      case "GET_INCIDENTS":
        return (
          <IncidentTable
            endpoint={"/getIncidents"}
            handleCompany={handleCompany}
            details={company}
          />
        );
      case "GET_EXTRA_INCIDENTS":
        return (
          <ExtraIncidentTable
            endpoint={"/getExtraIncidents"}
            handleCompany={handleCompany}
            details={company}
          />
        );
      case "GET_ENDPOINT":
        return (
          <EndpointTable
            endpoint={"/getEndpoints"}
            handleCompany={handleCompany}
            details={company}
          />
        );
      case "GET_ALL_ENDPOINT":
        return (
          <AllEndpointTable
            endpoint={"/getAllEndpoints"}
            handleCompany={handleCompany}
            details={company}
          />
        );
      case "GET_DEVICE_VIOLATION":
        return (
          <GetDeviceViolationTable
            endpoint={"/getViolations"}
            handleCompany={handleCompany}
            details={company}
          />
        );
      case "GET_POLICY":
        return (
          <GetPolicy
            endpoint={"/getPolicy"}
            handleCompany={handleCompany}
            details={company}
          />
        );
      case "GET_AUDIT_MANAGEMENT_LOG":
        return (
          <GetAuditManagementLogTable
            endpoint={"/getAuditManagementLog"}
            handleCompany={handleCompany}
            details={company}
          />
        );
      case "GET_AUDIT_AGENT_REPORTS":
        return (
          <GetAuditAgentReportsTable
            endpoint={"/getAuditAgentReports"}
            handleCompany={handleCompany}
            details={company}
          />
        );
      case "GET_SCRIPTS":
        return (
          <GetScripts
            endpoint={"/getScripts"}
            handleCompany={handleCompany}
            details={company}
          />
        );
      case "GET_SCRIPT_METADATA":
        return (
          <GetScriptMetdataTable
            endpoint={"/getScriptMetadata"}
            handleCompany={handleCompany}
            details={company}
          />
        );
      case "GET_SCRIPT_CODE":
        return (
          <GetScriptCodeTable
            endpoint={"/getScriptCode"}
            handleCompany={handleCompany}
            details={company}
          />
        );
      // case "GET_DISTRIBUTION_VERSION":
      //   return (
      //     <DistributionVersionTable endpoint={"/getDistributionVersion"} />
      //   );
      default:
        return <></>;
    }
  };
  return (
    <Fragment>
      <Header />
      <ResponsiveDrawer />
      <Grid container className={classes.hero}>
        {renderComponent(props.selectedAPI)}
      </Grid>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedAPI:
      state.getIncidentReducer && state.getIncidentReducer.selectedAPI,
    loading: state.getIncidentReducer && state.getIncidentReducer.loading,
    getCompanyList:
      state.getIncidentReducer && state.getIncidentReducer.getCompanyList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callGetCompanyList: () => {
      dispatch(callGetCompanyList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
