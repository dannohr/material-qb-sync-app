import React, { Component } from "react";
import { connect } from "react-redux";
import { customerActions } from "../../_actions";

import "./Customer.css";
import CustomerTable from "../../components/CustomerTable/CustomerTable";

class Customer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLoading: false,
      customerData: {}
    };
  }

  componentDidMount() {
    this.props.dispatch(customerActions.getAllCustomers());
  }

  createTableHeader() {
    let columns = [
      { title: "id", field: "id", type: "numeric" },
      { title: "QB id", field: "qbId", type: "numeric" },
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
        id: customer.id,
        qbId: customer.qbId,
        name: customer.CustomerName,
        Balance: customer.Balance,
        Active: customer.Active ? "yes" : "no",
        SyncToken: customer.SyncToken,
        LastUpdate: customer.updatedAt
      };
    });
    return data;
  }

  render() {
    return (
      <div className="container">
        <div className="well text-center">
          <h1>All Customers</h1>
        </div>
        <CustomerTable
          columns={this.createTableHeader()}
          data={this.createTableRows(this.props.customers)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoading, customers } = state.customer;

  return {
    isLoading,
    customers
  };
}

export default connect(mapStateToProps)(Customer);
