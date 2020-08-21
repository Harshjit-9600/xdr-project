import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import {
  callGetScriptsAPI,
  callGetScriptMetadataAPI,
  callGetScriptCodeAPI,
} from "../containers/getScripts/action";
import { setLoading } from "../containers/getIncidents/actions";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 500,
    width: "100%",
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

function GetScriptCodeTable(props) {
  const classes = useStyles();
  const [selectedIncident, setSelectedIncident] = React.useState("");
  const [companyId, setCompanyId] = useState("");
  useEffect(() => {
    if (props.details !== null) {
      props.callGetScriptsAPI({
        companyId: props.details[0]._id,
        selectedIncident: selectedIncident,
      });
      props.setLoading(true);
      setCompanyId(props.details[0]._id);
    }
  }, []);
  const handleChange = (event) => {
    props.callGetScriptsAPI({
      companyId: event.target.value,
      selectedIncident: selectedIncident,
    });
    let details = props.getCompanyList.filter(
      (value) => value._id == event.target.value
    );

    props.handleCompany(details);

    props.setLoading(true);
    setCompanyId(event.target.value);
  };

  const handleChange2 = (event) => {
    //  setSelectedIncident(event.target.value);
    if (companyId) {
      props.callGetScriptCodeAPI({
        selectedIncident: event.target.value,
        companyId: companyId,
      });
      props.setLoading(true);
    }
    setSelectedIncident(event.target.value);
  };
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
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Script</InputLabel>
        <Select
          label="Script"
          onChange={handleChange2}
          value={selectedIncident}
        >
          {props.getScripts.map((value) => (
            <MenuItem value={value.script_uid}>{value.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <h2>{`POST ${props.endpoint}`}</h2>
      {props.loading ? (
        <CircularProgress className={classes.loader} />
      ) : props.getScriptCodeFailuer ? (
        props.getScriptCodeFailuer
      ) : props.getScriptCode ? (
        <TextField
          value={props.getScriptCode}
          className={classes.container}
          multiline
          disabled
        />
      ) : (
        <div> Select dropdown value</div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    getScriptMetadata:
      state.getScriptsReducer && state.getScriptsReducer.getScriptMetadata,
    getScripts: state.getScriptsReducer && state.getScriptsReducer.getScripts,
    getScriptMetadataFailure:
      state.getScriptsReducer &&
      state.getScriptsReducer.getScriptMetadataFailure,
    getScriptCode:
      state.getScriptsReducer && state.getScriptsReducer.getScriptCode,
    getScriptCodeFailure:
      state.getScriptsReducer && state.getScriptsReducer.getScriptCodeFailure,
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
    callGetScriptsAPI: (data) => {
      dispatch(callGetScriptsAPI(data));
    },
    callGetScriptCodeAPI: (data) => {
      dispatch(callGetScriptCodeAPI(data));
    },
    callGetScriptMetadataAPI: (data) => {
      dispatch(callGetScriptMetadataAPI(data));
    },
    setLoading: (data) => dispatch(setLoading(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetScriptCodeTable);
