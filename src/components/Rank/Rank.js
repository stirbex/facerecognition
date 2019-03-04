import React, { Component } from "react";
import ReactDOM from "react-dom";

const Rank = () => {
  return (
    <div>
      <div className="white f3">{"Your current rank is..."}</div>
      <div className="white f3">
        {"#"}
        <span style={{ color: "red", fontWeight: "bold" }}>{"1"}</span>
      </div>
    </div>
  );
};

export default Rank;
