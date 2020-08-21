import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getTableField, formatTimestamp } from "../utils.js";
import JsonDialog from "./JsonDialog";
import {
  callGetScriptsAPI,
  callGetScriptMetadataAPI,
} from "../containers/getScripts/action";
import CircularProgress from "@material-ui/core/CircularProgress";
import { setLoading } from "../containers/getIncidents/actions";
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

function GetScriptMetadataTable(props) {
  const classes = useStyles();
  let columns = getTableField(props?.getScriptMetadata);
  const [companyId, setCompanyId] = useState("");
  const [scriptMetadata, setScriptMetadata] = useState("");
  useEffect(() => {
    if (props.details !== null) {
      props.callGetScriptsAPI({ companyId: props.details[0]._id });
      props.setLoading(true);
      setCompanyId(props.details[0]._id);
    }
  }, []);
  const handleChange = (event) => {
    props.callGetScriptsAPI({ companyId: event.target.value });
    props.setLoading(true);
    setCompanyId(event.target.value);
  };
  const handleChange2 = (event) => {
    if (companyId) {
      props.callGetScriptMetadataAPI({
        scriptMetadata: event.target.value,
        companyId: companyId,
      });
      props.setLoading(true);
    }
    setScriptMetadata(event.target.value);
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
        <Select onChange={handleChange2}>
          {props.getScripts.map((value) => (
            <MenuItem value={value.script_uid}>{value.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <h2>{`POST ${props.endpoint}`}</h2>
      {props.loading ? (
        <CircularProgress className={classes.loader} />
      ) : props.getScriptMetadataFailure ? (
        props.getScriptMetadataFailure
      ) : props.getScriptMetadata ? (
        <>
          <center>
            {" "}
            <JsonDialog src={props.getScriptMetadata} />
          </center>
          <MaterialTable
            className={classes.container}
            title={""}
            columns={columns}
            data={[props.getScriptMetadata].map((item) => {
              let script_input = "";
              if (item.script_input && Array.isArray(item.script_input)) {
                item.script_input.forEach((element, index) => {
                  if (index != 0) {
                    script_input += ", ";
                  }
                  script_input += `${element.name} : ${element.type}`;
                });
                item.script_input = script_input;
              }
              item.modification_time = formatTimestamp(item.modification_time);
              return item;
            })}
          ></MaterialTable>
        </>
      ) : (
        <div> Select dropdown value</div>
      )}
      {/* {props.loading ? <CircularProgress className={classes.loader} /> : props.getScriptMetadataFailure ? props.getScriptMetadataFailure :
          props.getScriptMetadata && props.getScriptMetadata.length > 0 ? <MaterialTable
          className={classes.container}
          title={""}
          columns={columns}
          data={[props.getScriptMetadata]}
          ></MaterialTable> : 'Select Company'} */}
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
    callGetScriptMetadataAPI: (data) => {
      dispatch(callGetScriptMetadataAPI(data));
    },
    setLoading: (data) => dispatch(setLoading(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetScriptMetadataTable);
