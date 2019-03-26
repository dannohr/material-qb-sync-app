import React, { Component } from "react";
import "./Home.css";

import Dashboard from "../Dashboard/Dashboard";

class Home extends Component {
  componentDidUpdate() {
    console.log(this.props);
  }
  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? (
          <Dashboard />
        ) : (
          <div className="lander">
            <h1>Simple Login Page</h1>
            <p>A sample app using SQL database and passport to login.</p>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
