import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import JsonDialog from "./JsonDialog";
import { getTableField, formatTimestamp } from "../utils.js";
import {
  setLoading,
  callGetIncidentsAPI,
} from "../containers/getIncidents/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: 0,
    padding: theme.spacing(2),
  },
  container: {
    maxHeight: 500,
  },
  mainContainer: {
    width: "100%",
  },
  formControl: {
    minWidth: 120,
    margin: 10,
  },
  loader: {
    margin: "200px 400px",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

function IncidentTable(props) {
  const classes = useStyles();

  useEffect(() => {
    if (props.details !== null) {
      props.callGetIncidentsAPI(props.details[0]._id);
      props.setLoading(true);
    }
  }, []);
  const handleChange = (event) => {
    //id="5f3b985d3e65fa0a8cfa081b"
    props.callGetIncidentsAPI(event.target.value);
    let details = props.getCompanyList.filter(
      (value) => value._id == event.target.value
    );

    props.handleCompany(details);
    props.setLoading(true);
  };

  let incidentColumns = getTableField(props?.getIncident?.[0]);

  return (
    <div className={classes.mainContainer}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Company</InputLabel>
        <Select label="Company" onChange={handleChange}>
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
      <h2>{`POST ${props.endpoint}`}</h2>
      {props.loading ? (
        <CircularProgress className={classes.loader} />
      ) : props.getIncidentFailure ? (
        props.getIncidentFailure
      ) : props.getIncident && props.getIncident.length > 0 ? (
        <>
          <center>
            <JsonDialog src={props.getIncident} />
          </center>
          <MaterialTable
            className={classes.container}
            title={""}
            columns={incidentColumns}
            data={props.getIncident.map((id) => {
              id.creation_time = formatTimestamp(id.creation_time);
              id.modification_time = formatTimestamp(id.modification_time);
              return id;
            })}
          ></MaterialTable>
        </>
      ) : (
        "Select Company"
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    getIncident:
      state.getIncidentReducer && state.getIncidentReducer.getIncident,
    getCompanyList:
      state.getIncidentReducer && state.getIncidentReducer.getCompanyList,
    getIncidentFailure:
      state.getIncidentReducer && state.getIncidentReducer.getIncidentFailure,
    getCompanyListFailure:
      state.getIncidentReducer &&
      state.getIncidentReducer.getCompanyListFailure,
    loading: state.getIncidentReducer && state.getIncidentReducer.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (data) => dispatch(setLoading(data)),
    callGetIncidentsAPI: (data) => {
      dispatch(callGetIncidentsAPI(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncidentTable);
