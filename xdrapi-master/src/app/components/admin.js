import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from "react-redux";
import {
  setLoading,
  addCompany,
  removeCompany,
} from "../containers/getIncidents/actions";
import { forwardRef } from "react";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import {
  deleteCompanyAPI,
  addCompanyAPI,
} from "../containers/getIncidents/api";
import AddCompany from "./addCompanyModal";
import DeleteCompany from "./deleteCompanyModal";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Button } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  mainContainer: {
    width: "100%",
  },
  loader: {
    margin: "200px 400px",
  },
  container: {
    maxHeight: 500,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    border: "2px solid #000",
    //boxShadow: theme.shadows[5],
    padding: "20px",
  },
  addCompanyBtn: {
    marginBottom: "20px",
  },
});
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Admin(props) {
  let columns = [{ title: "Name", field: "companyName" }];
  const classes = useStyles();
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  let tableIcons = {
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  };
  const deleteCompany = async (data) => {
    setCompanyDetails(data);
    setDeleteModal(true);
  };
  const callDeleteCompanyAPI = async (data) => {
    let res = await deleteCompanyAPI(data);
    if (res.status === 200) {
      setSuccessMsg(res.data.message);
      setErrorMsg("");
      setOpen(true);
      props.removeCompany(res.data.data);
    } else {
      setOpen(true);
      setSuccessMsg("");
      setErrorMsg(res.data.error);
    }
    setDeleteModal(false);
  };
  const addCompany = async (data) => {
    let res = await addCompanyAPI(data);
    if (res.status === 200) {
      setErrorMsg("");
      setSuccessMsg(res.data.message);
      setOpen(true);
      props.addCompany(res.data.data);
      setAddModal(false);
    } else {
      setOpen(true);
      setSuccessMsg("");
      setErrorMsg(res.data.error);
    }
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };
  const closeAddModal = () => {
    setErrorMsg("");
    setAddModal(false);
  };

  const handleClose = () => {
    setOpen(false);
    setSuccessMsg("");
    setErrorMsg("");
  }
  
  return (
    <div className={classes.mainContainer}>
      <Button
        className={classes.addCompanyBtn}
        variant="contained"
        color="primary"
        startIcon={<AddCircleIcon />}
        onClick={() => {
          setAddModal(true);
        }}
      >
        Company
      </Button>

      {props.loading ? (
        <CircularProgress className={classes.loader} />
      ) : props.getCompanyListFailure ? (
        props.getCompanyListFailure
      ) : (
        <MaterialTable
          title=""
          className={classes.container}
          columns={columns}
          data={props.getCompanyList}
          actions={[
            (rowData) => ({
              icon: tableIcons.Delete,
              tooltip: "Delete",
              onClick: (event, rowData) => deleteCompany(rowData),
              //disabled: rowData.isActive,
            }),
          ]}
        />
      )}
      {deleteModal && (
        <DeleteCompany
          open={deleteModal}
          close={closeDeleteModal}
          companyDetails={companyDetails}
          deleteCompanyAPI={callDeleteCompanyAPI}
        />
      )}
      {addModal && (
        <AddCompany
          open={addModal}
          close={closeAddModal}
          addCompanyAPI={addCompany}
          errorMsg={errorMsg}
        />
      )}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={successMsg ? "success" : errorMsg ?  "error" : ""}>
        {successMsg ? successMsg : errorMsg}
        </Alert>
      </Snackbar>

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
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
    removeCompany: (res) => {
      dispatch(removeCompany(res));
    },
    addCompany: (res) => {
      dispatch(addCompany(res));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
