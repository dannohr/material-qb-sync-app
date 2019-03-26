import React, { Component, Fragment } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBIcon,
  MDBNavLink
} from "mdbreact";

import "./EditUser.css";
import SavePasswordButton from "../../../components/SavePasswordButton/SavePasswordButton";

export default class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isAuthenticating: false,
      isAuthenticated: false,
      error: false,
      message: "",
      userInfo: {},
      newUser: false,
      allCompanies: [],
      newUserCompanyId: null
    };
  }

  async componentDidMount() {
    console.log("mounting");
    let userId = this.props.match.params.userId;
    console.log(parseInt(userId));
    // this is checking to see is a user is already logged in
    const accessString = localStorage.getItem("JWT");

    if (accessString == null) {
      console.log("accessString is null");
      this.setState({
        isLoading: false,
        error: true,
        isAuthenticating: false
      });
    } else {
      //get list of companies
      await axios
        .get("/companies", {
          headers: { Authorization: `JWT ${accessString}` }
        })
        .then(response => {
          console.log(response);
          this.setState({
            allCompanies: response.data.allCompanies
          });
          // console.log(response.data);
          console.log(this.state);
        })
        .catch(error => {
          console.error(error.response.data);
        });
    }

    //check if userId is a number, only make axios call if it is
    if (userId === parseInt(userId)) {
      await axios
        .get("/user?userId=" + userId, {
          headers: { Authorization: `JWT ${accessString}` }
        })
        .then(response => {
          console.log(response);
          this.setState({
            isLoading: false,
            isAuthenticated: response.data.isAuthenticated,
            userInfo: response.data.userInfo
          });
          // console.log(response.data);
          console.log(this.state);
        })
        .catch(error => {
          console.error(error.response.data);
          this.setState({
            error: true,
            isAuthenticating: false,
            isAuthenticated: false
          });
          localStorage.removeItem("JWT"); //clear expired
        });
    }
    //if userId not a number, treat is as creating a new user
    else {
      console.log("New ");
      this.setState({
        isLoading: false,
        userInfo: {},
        newUser: true
      });
      console.log(this.state);
    }
  }

  handleChange = event => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [event.target.id]: event.target.value
      }
    });
  };

  handleEditUser = () => {
    console.log("API Call to save data");
  };
  handleNewUser = e => {
    e.preventDefault();
    let body = {
      username: this.state.userInfo.username,
      password: this.state.userInfo.password,
      firstName: this.state.userInfo.firstName,
      lastName: this.state.userInfo.lastName,
      email: this.state.userInfo.email,
      companyId: this.state.newUserCompanyId
    };
    console.log("API Call to create new user", body);

    // const {
    //   firstName,
    //   lastName,
    //   username,
    //   password,
    //   email
    // } = this.state.userInfo;
    if (body.username === "" || body.password === "" || body.email === "") {
      this.setState({
        showError: true,
        loginError: false,
        registerError: true
      });
    } else {
      axios
        .post(
          "/addUser",
          body //{
          //   firstName,
          //   lastName,
          //   email,
          //   username,
          //   password
          // }
        )
        .then(response => {
          console.log(response.data);
          this.setState({
            messageFromServer: response.data.message,
            showError: false,
            loginError: false,
            registerError: false,
            userInfo: response.data.userInfo,
            newUser: false
          });
          console.log(this.state);
        })
        .catch(error => {
          console.error(error.response.data);
          if (error.response.data === "username or email already taken") {
            this.setState({
              showError: true,
              loginError: true,
              registerError: false
            });
          }
        });
    }
  };

  handleCompanySelect = e => {
    let compId = Number(e.target.value);

    this.setState({
      newUserCompanyId: compId
    });
  };

  render() {
    let companyList = this.state.allCompanies.map(company => {
      return (
        <option value={company.id} key={company.id}>
          {company.name}
        </option>
      );
    });

    return (
      <MDBContainer>
        {this.state.newUser ? <h1>Create User</h1> : <h1>Edit User</h1>}

        <MDBNavLink to={"/user/all"}>
          <MDBBtn color="primary" size="sm" className="mb-4">
            <MDBIcon icon="arrow-left" className="mr-1" /> All Users
          </MDBBtn>
        </MDBNavLink>

        <MDBRow className="border">
          <MDBCol>
            <form>
              <MDBRow center>
                <MDBCol md="4">
                  <MDBInput
                    id="username"
                    label="Username"
                    icon="user"
                    group
                    type="text"
                    size="sm"
                    value={this.state.userInfo.username}
                    onChange={this.handleChange}
                  />
                </MDBCol>
                <MDBCol md="4">
                  <MDBInput
                    id="email"
                    label="Email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    value={this.state.userInfo.email}
                    onChange={this.handleChange}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow center>
                <MDBCol md="4">
                  <MDBInput
                    id="firstName"
                    label="First Name"
                    icon="user"
                    group
                    type="text"
                    size="sm"
                    value={this.state.userInfo.firstName}
                    onChange={this.handleChange}
                  />
                </MDBCol>
                <MDBCol md="4">
                  <MDBInput
                    id="lastName"
                    label="Last Name"
                    icon="user"
                    group
                    type="text"
                    size="sm"
                    value={this.state.userInfo.lastName}
                    onChange={this.handleChange}
                  />
                </MDBCol>
              </MDBRow>
              {this.state.newUser ? (
                <Fragment>
                  <MDBRow center>
                    <MDBCol md="4">
                      <MDBInput
                        id="password"
                        label="Password"
                        icon="key"
                        group
                        type="text"
                        size="sm"
                        onChange={this.handleChange}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="my-auto center">
                      <div>
                        <select
                          className="browser-default custom-select"
                          id="companyId"
                          onChange={this.handleCompanySelect}
                        >
                          <option>Select Initial Company</option>
                          {companyList}
                        </select>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </Fragment>
              ) : null}

              <MDBRow center>
                {this.state.newUser ? (
                  <MDBBtn
                    color="primary"
                    onClick={this.handleNewUser}
                    className="center"
                  >
                    Save New User
                  </MDBBtn>
                ) : (
                  <MDBBtn
                    color="primary"
                    onClick={this.handleEditUser}
                    className="center"
                  >
                    Save Changes
                  </MDBBtn>
                )}
              </MDBRow>
            </form>
          </MDBCol>
        </MDBRow>

        {this.state.newUser ? null : (
          <Fragment>
            <MDBRow className="justify-content-md-left my-0 py-0 mt-5">
              <MDBCol>Reset User Password</MDBCol>
            </MDBRow>

            <MDBRow center>
              <MDBCol md="4">
                <MDBInput
                  id="password"
                  label="Password"
                  icon="key"
                  group
                  type="text"
                  size="sm"
                  onChange={this.handleChange}
                />
              </MDBCol>
              <MDBCol md="4" className="my-auto center">
                <SavePasswordButton
                  username={this.state.userInfo.username}
                  password={this.state.userInfo.password}
                />
              </MDBCol>
            </MDBRow>
          </Fragment>
        )}
      </MDBContainer>
    );
  }
}
