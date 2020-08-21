import React from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { Modal, Fade, LinearProgress, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  addBtn: {
    marginRight: "10px",
  },
});

function AddCompany(props) {
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
              companyName: "",
              tenantURL: "",
              apiKey: "",
              authId: "",
            }}
            validate={(values, errors) => {
              errors = {};
              if (!values.companyName) {
                errors.companyName = "Required";
              }
              if (!values.tenantURL) {
                errors.tenantURL = "Required";
              }
              if (!values.apiKey) {
                errors.apiKey = "Required";
              }
              if (!values.authId) {
                errors.authId = "Required";
              }
              if (isNaN(values.authId)) {
                errors.authId = "Input should be number";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              console.log("values", values);
              setTimeout(() => {
                setSubmitting(false);
              }, 500);
              props.addCompanyAPI(values);
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <Form className={classes.form}>
                <Field
                  component={TextField}
                  margin="normal"
                  required
                  fullWidth
                  label="Company Name"
                  name="companyName"
                />
                <Field
                  component={TextField}
                  margin="normal"
                  required
                  fullWidth
                  label="Tenant URl"
                  name="tenantURL"
                />
                <Field
                  component={TextField}
                  margin="normal"
                  required
                  fullWidth
                  label="API KEY"
                  name="apiKey"
                />
                <Field
                  component={TextField}
                  margin="normal"
                  required
                  fullWidth
                  label="Auth ID"
                  name="authId"
                />
                {props.errorMsg && (
                  <div style={{ color: "red" }}>{props.errorMsg}</div>
                )}
                {isSubmitting && <LinearProgress />}
                <br />
                <div>
                  <Button
                    className={classes.addBtn}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Add
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
export default AddCompany;
