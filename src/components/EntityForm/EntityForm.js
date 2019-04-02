import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
// import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";

// Set default so there will always be a value
// const { user = {} } = this.props;

const styles = theme => ({
  layout: {
    width: "auto",
    // width: "800px",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto"
    }
    // borderColor: "#c520b7",
    // borderStyle: "solid"
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  address: {
    //  borderColor: "#D3D3D3",
    // borderStyle: "solid",
    padding: theme.spacing(1),
    margin: theme.spacing(1)
  }
});

class EntityForm extends React.Component {
  render() {
    const { classes } = this.props;
    // console.log(this.props);

    return (
      <React.Fragment>
        <CssBaseline />

        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Add/Edit Customer
            </Typography>

            <Grid container>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    // fullWidth
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.address}>
                  <AddressForm title="Billing Address" />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.address}>
                  <AddressForm title="Shipping Address" />
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

EntityForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EntityForm);
