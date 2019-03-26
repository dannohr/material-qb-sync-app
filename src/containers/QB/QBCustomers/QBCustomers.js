import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { qbActions } from "../../../_actions";
import { qbService } from "../../../_services";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import "./QBCustomers.css";
import CustomerTable from "../../../components/CustomerTable/CustomerTable";

const styles = theme => ({
  refreshBttm: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
});

class QBCustomers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLoading: false,
      customerData: {}
    };
  }

  componentWillMount() {
    this.handleRefresh();
  }
  handleRefresh() {
    this.props.dispatch(qbActions.getAllCustomers());
  }

  handleCopyAllFromQuickbooks() {
    console.log("Copying all customers from quickbooks to local database");
    let allCustomers = this.props.customers.Customer;
    console.log(allCustomers);

    //build an array with only the fields we're going to copy over
    let allCustomerBody = [];

    allCustomers.forEach(customer => {
      allCustomerBody.push({
        qbId: customer.Id,
        Active: customer.Active,
        Balance: customer.Balance,
        CustomerName: customer.DisplayName,
        SyncToken: customer.SyncToken
      });
    });

    qbService.copyQBdataToDB(allCustomerBody, "customer");
  }

  createTableHeader() {
    let columns = [
      { title: "id", field: "id", type: "numeric" },
      { title: "name", field: "name" },
      { title: "Active", field: "Active" },
      { title: "Balance", field: "Balance" },
      { title: "SyncToken", field: "SyncToken" },
      { title: "Last Updated", field: "LastUpdate" }
    ];
    return columns;
  }

  createTableRows(arr) {
    let data = arr.map((customer, index) => {
      return {
        id: customer.Id,
        name: customer.DisplayName,
        Balance: customer.Balance,
        Active: customer.Active ? "yes" : "no",
        SyncToken: customer.SyncToken,
        LastUpdate: customer.MetaData.LastUpdatedTime
      };
    });
    return data;
  }

  render() {
    const { classes } = this.props;

    let buttonsOrLogin = this.props.qbConnected ? (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleRefresh.bind(this)}
            >
              Refresh
            </Button>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            alignItems="flex-start"
            justify="flex-end"
            direction="row"
          >
            <Button
              variant="outlined"
              color="default"
              onClick={this.handleCopyAllFromQuickbooks.bind(this)}
              className={classes.refreshBttn}
            >
              Copy all local
            </Button>
          </Grid>
        </Grid>
      </div>
    ) : (
      <Box>
        <Typography>
          <Link component={RouterLink} to="/qblogin">
            Login
          </Link>{" "}
          to Quickbooks to access data
        </Typography>
      </Box>
    );

    let table = this.props.customers.Customer ? (
      <CustomerTable
        columns={this.createTableHeader()}
        data={this.createTableRows(this.props.customers.Customer)}
      />
    ) : null;

    return (
      <div className="container">
        <div className="well text-center">
          <h1>Quickbooks Customers</h1>
        </div>
        {buttonsOrLogin}
        {table}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { qbConnected, customers } = state.qb;

  return {
    qbConnected,
    customers
  };
}

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(withStyles(styles)(QBCustomers));
