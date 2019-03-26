import React, { Component } from "react";
import { connect } from "react-redux";
import { qbActions } from "../../_actions";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
import moment from "moment";

import "./QBLogin.css";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    textAlign: "center",
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  heading: {
    textAlign: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  buttons: {
    textAlign: "center",
    margin: `${theme.spacing(2)}px`
  }
});

class QBLogin extends Component {
  // constructor(props) {
  //   super(props);
  // }

  handleLogin = e => {
    this.props.dispatch(qbActions.loginAndGetCompany());
  };
  handleLogout = () => {
    this.props.dispatch(qbActions.logout());
  };

  handleRefresh = async () => {
    try {
      let response = await axios.get("/api/qb/refresh");
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  handleGet = e => {
    this.props.dispatch(qbActions.getCompany());
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Typography className={classes.heading} component="h1" variant="h5">
            Establish Quickbooks Connection
          </Typography>

          <div className="text-center">
            {this.props.qbConnected && !this.props.isLoading ? (
              <div>
                <Button
                  color="secondary"
                  onClick={this.handleRefresh.bind(this)}
                  className={classes.buttons}
                  variant="outlined"
                >
                  Refresh Token
                </Button>
                <Button
                  color="default"
                  onClick={this.handleLogout.bind(this)}
                  variant="outlined"
                  className={classes.buttons}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                color="secondary"
                onClick={this.handleLogin.bind(this)}
                variant="outlined"
              >
                Login
              </Button>
            )}
          </div>
          <hr />

          {this.props.companyData.CompanyName ? (
            <div>
              <p>
                Successfully connected to: {this.props.companyData.CompanyName}
              </p>
              <Typography>
                Company Last Updated{" "}
                <b>
                  {moment(
                    this.props.companyData.MetaData.LastUpdatedTime
                  ).format("MMMM Do YYYY, h:mm:ss a")}
                </b>
              </Typography>
            </div>
          ) : null}
        </Paper>
      </main>
    );
  }
}

function mapStateToProps(state) {
  const { qbConnected, companyData, isLoading } = state.qb;
  return {
    qbConnected,
    isLoading,
    companyData
  };
}

// export default connect(mapStateToProps)(QBLogin);
export default connect(
  mapStateToProps
  // mapDispatchToProps
)(withStyles(styles)(QBLogin));
