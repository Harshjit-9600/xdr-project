import React from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 500,
  },
  mainContainer: {
    width: "100%"
  }
});

function DistributionVersion(props) {
  const classes = useStyles();
  let columns = [
    { title: "Linux", field: "linux" },
    { title: "macOS", field: "macos" },
    { title: "Windows", field: "windows" },
  ];
  return (
    <div className={classes.mainContainer}>
      <h2>{`POST ${props.endpoint}`}</h2>
      {props.getDistributionVersionFailure &&
        props.getDistributionVersionFailure}
      {!props.getDistributionVersionFailure && (
        <MaterialTable
          className={classes.container}
          title={""}
          columns={columns}
          data={props.getDistributionVersion}
        ></MaterialTable>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    getDistributionVersion:
      state.getEndpointReducer &&
      state.getEndpointReducer.getDistributionVersion,
    getDistributionVersionFailure:
      state.getEndpointReducer &&
      state.getEndpointReducer.getDistributionVersionFailure,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributionVersion);
