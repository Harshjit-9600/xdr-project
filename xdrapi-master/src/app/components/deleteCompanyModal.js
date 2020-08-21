import React from "react";
import { Form, Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Fade, LinearProgress, Button } from "@material-ui/core";

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
  delete: {
    marginRight: "10px",
  },
});

function DeleteCompany(props) {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.open}
      onClose={props.close}
    >
      <Fade in={props.open}>
        <div className={classes.paper}>
          <Formik
            initialValues={{
              companyId: props.companyDetails._id,
            }}
            onSubmit={async (values, { setSubmitting }) => {
              console.log("values", values);
              setTimeout(() => {
                setSubmitting(false);
              }, 500);
              props.deleteCompanyAPI(values);
            }}
          >
            {({ submitForm, isSubmitting, setFieldValue, values }) => (
              <Form className={classes.form}>
                <div>
                  <h3>Delete Company</h3>
                </div>
                <div>
                  <p>
                    Are you sure you want to delete this{" "}
                    {props.companyDetails.companyName}? This cannot be undone.
                  </p>
                </div>
                {isSubmitting && <LinearProgress />}
                <br />
                <div>
                  <Button
                    className={classes.delete}
                    // fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={() => {
                      submitForm();
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    className={classes.cancel}
                    variant="contained"
                    color="primary"
                    onClick={props.close}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Fade>
    </Modal>
  );
}
export default DeleteCompany;
