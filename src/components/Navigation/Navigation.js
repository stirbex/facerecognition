import React, { Component } from "react";
import ReactDOM from "react-dom";

class Navigation extends Component {
  render() {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p className="f3 link dim black underline pa3 pointer"> Sign in</p>
      </nav>
    );
  }
}

export default Navigation;
