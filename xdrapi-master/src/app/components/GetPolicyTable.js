import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { callGetPolicytAPI } from "../containers/getPolicy/action";
import { callGetEndpointAPI } from "../containers/getEndpoint/action";
import { setLoading } from "../containers/getIncidents/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
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
    minWidth: 120,
    margin: 10,
  },
  loader: {
    margin: "200px 400px",
  },
});

function GetPolicyTable(props) {
  const classes = useStyles();
  const [companyId, setCompanyId] = useState("");
  const [policy, setPolicy] = useState("");
  // const handleChange = (event) => {
  //   props.callGetPolicytAPI(event.target.value);
  //   props.setLoading(true);
  // };
  useEffect(() => {
    if (props.details !== null) {
      props.callGetEndpointAPI({ companyId: props.details[0]._id });
      props.setLoading(true);
      setCompanyId(props.details[0]._id);
    }
  }, []);

  const handleChange1 = (event) => {
    props.callGetEndpointAPI({ companyId: event.target.value });
    let details = props.getCompanyList.filter(
      (value) => value._id == event.target.value
    );

    props.handleCompany(details);
    props.setLoading(true);
    setCompanyId(event.target.value);
  };
  const handleChange2 = (event) => {
    if (companyId) {
      props.callGetPolicytAPI({
        policy: event.target.value,
        companyId: companyId,
      });
      props.setLoading(true);
    }
    setPolicy(event.target.value);
  };
  let policyColumns = getTableField(props?.getPolicy);
  return (
    <div className={classes.mainContainer}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Company</InputLabel>
        <Select label="Company" onChange={handleChange1}>
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
        <InputLabel id="demo-simple-select-outlined-label">Policy</InputLabel>
        <Select label="Policy" onChange={handleChange2}>
          {props.getEndpoint.map((value) => (
            <MenuItem value={value.endpoint_id}>{value.endpoint_name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <h2>{`POST ${props.endpoint}`}</h2>
      {props.loading ? (
        <CircularProgress className={classes.loader} />
      ) : props.getPolicytFailure ? (
        props.getPolicytFailure
      ) : props.getPolicy ? (
        <>
          {" "}
          <center>
            {" "}
            <JsonDialog src={props.getPolicy} />
          </center>
          <MaterialTable
            className={classes.container}
            title={""}
            columns={policyColumns}
            data={[props.getPolicy]}
          ></MaterialTable>
        </>
      ) : (
        <div> Select dropdown value</div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    getEndpoint:
      state.getEndpointReducer && state.getEndpointReducer.getEndpoint,
    getPolicy: state.getPolicyReducer && state.getPolicyReducer.getPolicy,
    getPolicytFailure:
      state.getPolicyReducer && state.getPolicyReducer.getPolicyFailure,
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
    callGetPolicytAPI: (data) => {
      dispatch(callGetPolicytAPI(data));
    },
    callGetEndpointAPI: (data) => {
      dispatch(callGetEndpointAPI(data));
    },
    setLoading: (data) => dispatch(setLoading(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetPolicyTable);
