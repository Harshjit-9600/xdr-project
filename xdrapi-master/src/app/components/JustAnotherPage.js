import React from "react";
import "../App.css";
import { push } from "connected-react-router";
import { connect } from "react-redux";

function JustAnotherPage(props) {
  return (
    <div className="App">
      <header className="App-header">
        <p>IN JustAnotherPage.</p>
        <button onClick={() => props.goBack()}>Previus page</button>
      </header>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    goBack: () => dispatch(push("/")),
  };
};

export default connect(null, mapDispatchToProps)(JustAnotherPage);
