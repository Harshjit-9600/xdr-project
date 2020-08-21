import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  setSelectedAPI,
  setLoading,
  callGetIncidentsAPI,
  callGetExtraIncidentsAPI,
} from "../containers/getIncidents/actions";
import {
  callGetScriptsAPI,
  callGetScriptCodeAPI,
} from "../containers/getScripts/action";
import { callGetAllEndpointAPI } from "../containers/getEndpoint/action";
import {
  callAuditManagementLogAPI,
  callAuditAgentReportsAPI,
} from "../containers/getAuditManagementLog/action";

import {
  callGetDistributionVersionAPI,
  callGetDeviceViolationAPI,
} from "../containers/getDeviceControl/actions";
import { connect } from "react-redux";

function mainListItems(props) {
  return (
    <div>
      <h3 style={{ padding: "20px" }}>API REFERENCES</h3>
      <ListItem
        button
        onClick={() => {
          props.setSelectedAPI("ADMIN");
        }}
      >
        <ListItemText primary="Admin" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          props.setSelectedAPI("GET_INCIDENTS");
        }}
      >
        <ListItemText primary="Get Incidents" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          props.setSelectedAPI("GET_EXTRA_INCIDENTS");
          // if (props.getIncident && props.getIncident.length === 0) {
          //  // props.callGetIncidentsAPI();
          //   //props.setLoading(true);
         // }
        }}
      >
        <ListItemText primary="Get Extra Incident Data" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          props.setSelectedAPI("GET_ENDPOINT");
        }}
      >
        <ListItemText primary="Get Endpoints" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          props.setSelectedAPI("GET_ALL_ENDPOINT");
          //props.callGetAllEndpointAPI();
          //props.setLoading(true);
        }}
      >
        <ListItemText primary="Get All Endpoints" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          props.setSelectedAPI("GET_DEVICE_VIOLATION");
          // props.callGetDeviceViolationAPI();
          // props.setLoading(true);
        }}
      >
        <ListItemText primary="Get Device Violations" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          props.setSelectedAPI("GET_POLICY");
        }}
      >
        <ListItemText primary="Get Policy" />
      </ListItem>
      {/* <ListItem button 
     onClick={() => {
          props.setSelectedAPI("GET_DEVICE_VIOLATION");
          props.callGetDeviceViolationAPI();
          props.setLoading(true);
        }}>
        <ListItemText primary="Get Device Violatons" />
      </ListItem>  */}
      <ListItem
        button
        onClick={() => {
          props.setSelectedAPI("GET_AUDIT_MANAGEMENT_LOG");
          //props.callAuditManagementLogAPI();
          //props.setLoading(true);
        }}
      >
        <ListItemText primary="Get Audit Management Log" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          props.setSelectedAPI("GET_AUDIT_AGENT_REPORTS");
          //props.callAuditAgentReportsAPI();
          //props.setLoading(true);
        }}
      >
        <ListItemText primary="Get Audit Agent Reports" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          props.setSelectedAPI("GET_SCRIPTS");
          //props.callGetScriptsAPI();
         // props.setLoading(true);
        }}
      >
        <ListItemText primary="Get Scripts" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          props.setSelectedAPI("GET_SCRIPT_METADATA");
        }}
      >
        <ListItemText primary="Get Script Metadata" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          props.setSelectedAPI("GET_SCRIPT_CODE");
        }}
      >
        <ListItemText primary="Get Script Code" />
      </ListItem>
      {/* <ListItem button>
        <ListItemText
          primary="Get Distribution Version"
          onClick={() => {
            props.setSelectedAPI("GET_DISTRIBUTION_VERSION");
            props.callGetDistributionVersionAPI();
            props.setLoading(true);
          }}
        />
      </ListItem> */}
      {/* <ListItem button>
        <ListItemText primary="Get Distribution Status" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Get Quarantine Status" />
      </ListItem> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    getScripts: state.getScriptsReducer && state.getScriptsReducer.getScripts,
    getIncident:
      state.getIncidentReducer && state.getIncidentReducer.getIncident,
    getEndpoint:
      state.getEndpointReducer && state.getEndpointReducer.getEndpoint,
    getAllEndpoint:
      state.getEndpointReducer && state.getEndpointReducer.getAllEndpoint,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedAPI: (data) => dispatch(setSelectedAPI(data)),
    setLoading: (data) => dispatch(setLoading(data)),
    callGetIncidentsAPI: () => {
      dispatch(callGetIncidentsAPI());
    },
    callGetExtraIncidentsAPI: () => {
      dispatch(callGetExtraIncidentsAPI());
    },

    callGetAllEndpointAPI: () => {
      dispatch(callGetAllEndpointAPI());
    },
    callGetDistributionVersionAPI: () => {
      dispatch(callGetDistributionVersionAPI());
    },
    callGetDeviceViolationAPI: () => {
      dispatch(callGetDeviceViolationAPI());
    },
    callAuditManagementLogAPI: () => {
      dispatch(callAuditManagementLogAPI());
    },
    callAuditAgentReportsAPI: () => {
      dispatch(callAuditAgentReportsAPI());
    },
    callGetScriptsAPI: () => {
      dispatch(callGetScriptsAPI());
    },
    callGetScriptCodeAPI: () => {
      dispatch(callGetScriptCodeAPI());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(mainListItems);
