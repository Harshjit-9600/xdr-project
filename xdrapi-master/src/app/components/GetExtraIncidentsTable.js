import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import JsonDialog from "./JsonDialog";
import {
  callGetIncidentsAPI,
  callGetExtraIncidentsAPI,
} from "../containers/getIncidents/actions";
import { setLoading } from "../containers/getIncidents/actions";
import { getTableField, formatTimestamp } from "../utils.js";
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 500,
  },
  mainContainer: {
    width: "100%",
  },
  formControl: {
    minWidth: 150,
    margin: 10,
  },
  loader: {
    margin: "200px 400px",
  },
  title: {
    fontSize: "18px",
    padding: "10px",
  },
});

function GetExtraIncidentTable(props) {
  const classes = useStyles();
  const [companyId, setCompanyId] = useState("");
  const [extraIncident, setExtraIncident] = useState("");

  useEffect(() => {
    if (props.details !== null) {
      props.callGetIncidentsAPI(props.details[0]._id);
      props.setLoading(true);
      setCompanyId(props.details[0]._id);
    }
  }, []);

  const handleChangeCompanyId = (event) => {
    props.callGetIncidentsAPI(event.target.value);
    let details = props.getCompanyList.filter(
      (value) => value._id == event.target.value
    );
    props.handleCompany(details);
    props.setLoading(true);
    setCompanyId(event.target.value);
  };
  const handleChangeIncidentId = (event) => {
    if (companyId) {
      props.callGetExtraIncidentsAPI({
        extraIncident: event.target.value,
        companyId: companyId,
      });
      props.setLoading(true);
    }
    setExtraIncident(event.target.value);
  };
  const TablesJson = {
    incident: props.getExtraIncident,
    alerts: props.getExtraIncidentAlert,
    file_artifacts: props.getExtraIncidentfileartifacts,
    network_artifacts: props.getExtraIncidentnetworkartifacts,
  };

  let extraIncidentColumns = getTableField(props?.getExtraIncident);
  let alertColumns = getTableField(props?.getExtraIncidentAlert?.[0]);
  let networkArtifactColumns = getTableField(
    props?.getExtraIncidentnetworkartifacts?.[0]
  );
  let fileArtifcatColumns = getTableField(
    props?.getExtraIncidentfileartifacts?.[0]
  );
  return (
    <div className={classes.mainContainer}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Company</InputLabel>
        <Select label="Company" onChange={handleChangeCompanyId}>
          {props.details !== null ? (
            <MenuItem value={props.details[0]._id} key={props.details[0]._id}>
              {props.details[0].companyName}
            </MenuItem>
          ) : null}
          {props.getCompanyList &&
          props.getCompanyList.length > 0 &&
          props.details !== null
            ? props.getCompanyList
                .filter((value) => value._id !== props.details[0]._id)
                .map((value) => (
                  <MenuItem value={value._id}>{value.companyName}</MenuItem>
                ))
            : props.getCompanyList.map((value) => (
                <MenuItem value={value._id}>{value.companyName}</MenuItem>
              ))}
        </Select>
      </FormControl>
      <FormControl
        variant="outlined"
        className={classes.formControl}
        disabled={companyId ? false : true}
      >
        <InputLabel id="demo-simple-select-outlined-label">
          Incident Id
        </InputLabel>
        <Select label="IncidentId" onChange={handleChangeIncidentId}>
          {props.getIncident.map((value) => (
            <MenuItem value={value.incident_id}>{value.incident_id}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <h2>{`POST ${props.endpoint}`}</h2>
      {props.loading ? (
        <CircularProgress className={classes.loader} />
      ) : props.getExtraIncidentFailure ? (
        props.getExtraIncidentFailure
      ) : props.getExtraIncident ? (
        <div>
          <center>
            <JsonDialog src={TablesJson} />
          </center>
          <div className={classes.title}>Incident</div>
          <MaterialTable
            className={classes.container}
            title={""}
            columns={extraIncidentColumns}
            data={[props.getExtraIncident].map((item) => {
              item.creation_time = formatTimestamp(item.creation_time);
              item.modification_time = formatTimestamp(item.modification_time);
              item.detection_time = formatTimestamp(item.detection_time);
              return item;
            })}
          ></MaterialTable>
          {props.getExtraIncidentAlert &&
          props.getExtraIncidentAlert.length > 0 ? (
            <>
              <div className={classes.title}>Alert</div>
              <MaterialTable
                className={classes.container}
                title={""}
                columns={alertColumns}
                data={props.getExtraIncidentAlert.map((item) => {
                  item.detection_timestamp = formatTimestamp(
                    item.detection_timestamp
                  );
                  return item;
                })}
              ></MaterialTable>
            </>
          ) : null}
          {typeof props.getExtraIncidentnetworkartifacts === "undefined" ? (
            props.getExtraIncidentnetworkartifacts &&
            props.getExtraIncidentnetworkartifacts.length > 0 ? (
              <>
                <div className={classes.title}>Network Artifacts</div>
                <MaterialTable
                  className={classes.container}
                  title={""}
                  columns={networkArtifactColumns}
                  data={props.getExtraIncidentnetworkartifacts}
                ></MaterialTable>
              </>
            ) : null
          ) : null}

          {props.getExtraIncidentfileartifacts &&
          props.getExtraIncidentfileartifacts.length > 0 ? (
            <>
              <div className={classes.title}>File Artifacts</div>
              <MaterialTable
                className={classes.container}
                title={""}
                columns={fileArtifcatColumns}
                data={props.getExtraIncidentfileartifacts}
              ></MaterialTable>
            </>
          ) : null}
        </div>
      ) : (
        <div> Select dropdown value</div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    getExtraIncident:
      state.getIncidentReducer && state.getIncidentReducer.getExtraIncident,
    getExtraIncidentAlert:
      state.getIncidentReducer &&
      state.getIncidentReducer.getExtraIncidentAlert,
    getExtraIncidentnetworkartifacts:
      state.getIncidentReducer &&
      state.getIncidentReducer.getExtraIncidentnetworkartifacts,
    getExtraIncidentfileartifacts:
      state.getIncidentReducer &&
      state.getIncidentReducer.getExtraIncidentfileartifacts,
    getIncident:
      state.getIncidentReducer && state.getIncidentReducer.getIncident,
    getExtraIncidentFailure:
      state.getIncidentReducer &&
      state.getIncidentReducer.getExtraIncidentFailure,
    getCompanyList:
      state.getIncidentReducer && state.getIncidentReducer.getCompanyList,
    getCompanyListFailure:
      state.getIncidentReducer &&
      state.getIncidentReducer.getCompanyListFailure,
    loading: state.getIncidentReducer && state.getIncidentReducer.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callGetIncidentsAPI: (data) => {
      dispatch(callGetIncidentsAPI(data));
    },
    callGetExtraIncidentsAPI: (data) => {
      dispatch(callGetExtraIncidentsAPI(data));
    },
    setLoading: (data) => dispatch(setLoading(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetExtraIncidentTable);
