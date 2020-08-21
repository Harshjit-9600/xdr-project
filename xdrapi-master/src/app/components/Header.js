import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "../../assets/Logo.png";
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#fff",
  },
  title: {
    flexGrow: 1,
  },
}));
export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography className={classes.title} noWrap>
          <img src={logo} alt="Logo" height={70} />
        </Typography>
        {/* <Button variant="contained" color="primary">
          LogOut
        </Button> */}
      </Toolbar>
    </AppBar>
  );
}
