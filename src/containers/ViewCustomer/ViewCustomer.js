import React, { Component } from "react";
import { connect } from "react-redux";
import { customerActions } from "../../_actions";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import EntityForm from "../../components/EntityForm/EntityForm";

const styles = theme => ({
  appBar: {
    position: "relative"
  }
});

class ViewCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLoading: false,
      customerData: {}
    };
  }

  componentDidMount() {
    const { customerId } = this.props.match.params;
    let customerDetail = this.props.dispatch(
      customerActions.getCustomer(customerId)
    );
    console.log(customerDetail);
  }

  render() {
    let name =
      !this.props.isLoading && this.props.customer
        ? this.props.customer.CustomerName
        : "loading";

    const { classes } = this.props;

    return (
      <div className="container">
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              View/Edit Customer
            </Typography>
          </Toolbar>
        </AppBar>
        {name}

        <EntityForm entity={name} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoading, customer } = state.customer;

  return {
    isLoading,
    customer
  };
}

export default connect(mapStateToProps)(withStyles(styles)(ViewCustomer));
