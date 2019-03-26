import React, { Component } from "react";
import { connect } from "react-redux";
import { authActions } from "../../_actions";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import LoaderButton from "../LoaderButton/LoaderButton";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
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
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    marginTop: theme.spacing(3)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240
  },
  errorMsg: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    padding: `${theme.spacing(3)}px`,
    color: "#ff0000"
  }
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
      // companyId: 10
    };
  }

  // componentWillMount() {
  //   console.log(this.props);
  // }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;
    const { dispatch } = this.props;

    if (username && password) {
      dispatch(authActions.login(username, password));
    }
  };

  handleCompanySelect = e => {
    let compId = Number(e.target.value);

    localStorage.setItem("companyId", compId);
    this.props.dispatch(authActions.getMe());
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                name="username"
                autoComplete="username"
                autoFocus
                value={this.state.username}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormControl>
            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}

            {/* Hide if there's more than one company after logging in */}
            {!this.props.multiCompany ? (
              <LoaderButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!this.validateForm()}
                text="Login"
                loadingText="Logging in…"
                isLoading={this.props.isLoading}
              />
            ) : null}

            {/* Show if there's more than one company after logging in */}
            {this.props.multiCompany ? (
              <FormControl className={classes.formControl}>
                <Select
                  value=""
                  onChange={this.handleCompanySelect}
                  name="companyId"
                  displayEmpty
                  className={classes.selectEmpty}
                >
                  <MenuItem value="" disabled>
                    Select a Company
                  </MenuItem>

                  {this.props.companyList.map(company => (
                    <MenuItem value={company.id} key={company.id}>
                      {company.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null}
            {this.props.showError && (
              <div className="text-center">
                <Paper className={classes.errorMsg}>
                  That username or password isn&apos;t recognized. Please try
                  again or register now.
                </Paper>
              </div>
            )}
          </form>
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {
    isAuthenticated,
    showError,
    isLoading,
    multiCompany,
    companyList
  } = state.authentication;
  return {
    isAuthenticated,
    showError,
    isLoading,
    multiCompany,
    companyList
  };
}

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(withStyles(styles)(Login));
