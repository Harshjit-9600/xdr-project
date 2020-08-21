import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getTableField, formatTimestamp } from "../utils.js";
import { setLoading } from "../containers/getIncidents/actions";
import JsonDialog from "./JsonDialog";
import {
  callGetEndpointAPI,
  callGetAllEndpointAPI,
} from "../containers/getEndpoint/action";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 500,
  },
  formControl: {
    minWidth: 120,
    margin: 10,
  },
  mainContainer: {
    width: "100%",
  },
  loader: {
    margin: "200px 400px",
  },
});

function EndpointTable(props) {
  const classes = useStyles();
  useEffect(() => {
    if (props.details !== null) {
      props.callGetEndpointAPI({ companyId: props.details[0]._id });
      props.setLoading(true);
    }
  }, []);

  const handleChange = (event) => {
    props.callGetEndpointAPI({ companyId: event.target.value });
    let details = props.getCompanyList.filter(
      (value) => value._id == event.target.value
    );
    props.handleCompany(details);
    props.setLoading(true);
  };
  console.log(props.details);
  let endpointColumns = getTableField(props?.getEndpoint?.[0]);
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
      ) : props.getEndpointFailure ? (
        props.getEndpointFailure
      ) : props.getEndpoint && props.getEndpoint.length > 0 ? (
        <>
          <center>
            {" "}
            <JsonDialog src={props.getEndpoint} />
          </center>
          <MaterialTable
            className={classes.container}
            title={""}
            columns={endpointColumns}
            data={props.getEndpoint.map((item) => {
              item.first_seen = formatTimestamp(item.first_seen);
              item.last_seen = formatTimestamp(item.last_seen);
              item.install_date = formatTimestamp(item.install_date);
              item.isolated_date = formatTimestamp(item.isolated_date);
              return item;
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
    getEndpoint:
      state.getEndpointReducer && state.getEndpointReducer.getEndpoint,
    getEndpointFailure:
      state.getEndpointReducer && state.getEndpointReducer.getEndpointFailure,
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
    callGetEndpointAPI: (data) => {
      dispatch(callGetEndpointAPI(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EndpointTable);
