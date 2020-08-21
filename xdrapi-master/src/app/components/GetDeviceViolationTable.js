import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { setLoading } from "../containers/getIncidents/actions";
import { callGetDeviceViolationAPI } from "../containers/getDeviceControl/actions";
import { getTableField } from "../utils.js";
import JsonDialog from "./JsonDialog";

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
});

function DeviceViolationTable(props) {
  debugger;
  const classes = useStyles();
  useEffect(() => {
    if (props.details !== null) {
      props.callGetDeviceViolationAPI(props.details[0]._id);
      props.setLoading(true);
    }
  }, []);
  const handleChangeCompanyId = (event) => {
    props.callGetDeviceViolationAPI(event.target.value);
    let details = props.getCompanyList.filter(
      (value) => value._id == event.target.value
    );

    props.handleCompany(details);
    props.setLoading(true);
  };
  let columns = getTableField(props?.getDeviceViolation?.[0]);

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
      <h2>{`POST ${props.endpoint}`}</h2>
      {props.loading ? (
        <CircularProgress className={classes.loader} />
      ) : props.getDeviceViolationFailure ? (
        props.getDeviceViolationFailure
      ) : props.getDeviceViolation &&
        !isNaN(props.getDeviceViolation.length) ? (
        <>
          {" "}
          <center>
            <JsonDialog src={props.getDeviceViolation} />
          </center>
          <MaterialTable
            className={classes.container}
            title={""}
            columns={columns}
            data={props.getDeviceViolation}
          ></MaterialTable>
        </>
      ) : (
        <div> Please Select Company</div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    getDeviceViolation:
      state.deviceControlReducer &&
      state.deviceControlReducer.getDeviceViolation,
    getDeviceViolationFailure:
      state.deviceControlReducer &&
      state.deviceControlReducer.getDeviceViolationFailure,
    loading: state.getIncidentReducer && state.getIncidentReducer.loading,
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
    setLoading: (data) => dispatch(setLoading(data)),
    callGetDeviceViolationAPI: (data) => {
      dispatch(callGetDeviceViolationAPI(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceViolationTable);
