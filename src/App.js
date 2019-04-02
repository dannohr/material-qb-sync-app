import React, { Component } from "react";

import { connect } from "react-redux";
import { authActions } from "./_actions/auth.actions";
// import { qbActions } from "./_actions/qb.actions";
import "./App.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";

class App extends Component {
  // constructor(props) {
  //   super(props);

  // this.state = {
  //   isAuthenticated: false,
  //   isAuthenticating: true,
  //   username: "",
  //   companyId: null
  // };
  // }

  // componentDidUpdate() {
  //   console.log(props);
  // }

  async componentWillMount() {
    // this is checking to see is a user is already logged in
    const accessString = localStorage.getItem("JWT");
    const companyId = localStorage.getItem("companyId");

    console.log("attempting to login to company ", companyId);

    if (accessString == null) {
      console.log("accessString is null");
      // this.setState({
      //   isLoading: false,
      //   error: true,
      //   isAuthenticating: false,
      //   companyId: null,
      //   isAuthenticated: false
      // });
    } else {
      this.props.dispatch(authActions.getMe());
      // this.props.dispatch(qbActions.getCompany());
    }
  }

  render() {
    const childProps = {
      isAuthenticated: this.props.isAuthenticated, //props from redux
      qbConnected: this.props.qbConnected
    };

    const footProps = {
      username: this.props.username,
      companyName: this.props.companyLoggedIn
        ? this.props.companyLoggedIn.name
        : null,
      qbConnected: this.props.qbConnected,
      qbCompanyData: this.props.companyData
    };

    const theme = createMuiTheme({
      palette: {
        primary: {
          light: blue[300],
          main: blue[500],
          dark: blue[700]
        },
        secondary: {
          light: green[300],
          main: green[500],
          dark: green[700]
        },
        danger: {
          light: red[300],
          main: red[500],
          dark: red[700]
        }
      }
    });

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Nav childProps={childProps} />
        {this.props.isAuthenticated ? <Footer footProps={footProps} /> : null}
      </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  const { isAuthenticated, companyLoggedIn, username } = state.authentication;
  const { qbConnected, companyData } = state.qb;
  return {
    isAuthenticated,
    companyLoggedIn,
    username,
    qbConnected,
    companyData
  };
}

// export default App;
export default connect(mapStateToProps)(App);
