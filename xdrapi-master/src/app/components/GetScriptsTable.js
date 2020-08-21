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
import JsonDialog from "./JsonDialog";
import {
  setLoading,
  callGetCompanyList,
} from "../containers/getIncidents/actions";
import {
  callGetScriptsAPI,
  callGetScriptCodeAPI,
} from "../containers/getScripts/action";
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
    minWidth: 120,
    margin: 10,
  },
  loader: {
    margin: "200px 400px",
  },
});

function GetScriptsTable(props) {
  const classes = useStyles();
  useEffect(() => {
    if (props.details !== null) {
      props.callGetScriptsAPI({ companyId: props.details[0]._id });
      props.setLoading(true);
    }
  }, []);
  const handleChange = (event) => {
    props.callGetScriptsAPI({ companyId: event.target.value });
    let details = props.getCompanyList.filter(
      (value) => value._id == event.target.value
    );

    props.handleCompany(details);
    props.setLoading(true);
  };

  let columns = getTableField(props?.getScripts?.[0]);
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
      ) : props.getScriptsFailure ? (
        props.getScriptsFailure
      ) : props.getScripts && props.getScripts.length > 0 ? (
        <>
          <center>
            {" "}
            <JsonDialog src={props.getScripts} />
          </center>
          <MaterialTable
            className={classes.container}
            title={""}
            columns={columns}
            data={props.getScripts.map((item) => {
              item.modification_date = formatTimestamp(item.modification_date);
              item.TIMESTAMP = formatTimestamp(item.TIMESTAMP);
              item.RECEIVEDTIME = formatTimestamp(item.RECEIVEDTIME);
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
    getScripts: state.getScriptsReducer && state.getScriptsReducer.getScripts,
    getScriptsFailure:
      state.getScriptsReducer && state.getScriptsReducer.getScriptsFailure,
    loading: state.getIncidentReducer && state.getIncidentReducer.loading,
    getCompanyList:
      state.getIncidentReducer && state.getIncidentReducer.getCompanyList,
    getCompanyListFailure:
      state.getIncidentReducer &&
      state.getIncidentReducer.getCompanyListFailure,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (data) => dispatch(setLoading(data)),
    callGetScriptsAPI: (data) => {
      dispatch(callGetScriptsAPI(data));
    },
    callGetCompanyList: () => {
      dispatch(callGetCompanyList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetScriptsTable);
