import React from "react";
import { Route, Switch } from "react-router-dom"; // react-router v4/v5
import Home from "./components/home";
import JustAnotherPage from "./components/JustAnotherPage";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/justAnotherPage" component={JustAnotherPage} exact />
    </Switch>
  );
}

export default App;
