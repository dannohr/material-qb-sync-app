import React from "react";
import { withRouter } from "react-router-dom";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  table: {
    paddingTop: theme.spacing(3)
  }
}));

function CustomerTable(props) {
  const classes = useStyles();

  return (
    <div className={classes.table}>
      <MaterialTable
        columns={props.columns}
        data={props.data}
        title="Customer List"
        actions={[
          {
            icon: "account_circle",
            tooltip: "Show User Info",
            onClick: (event, rowData) => {
              let path = "customer/" + rowData.id;
              props.history.push(path);
            }
          }
        ]}
      />
    </div>
  );
}

export default withRouter(CustomerTable);
