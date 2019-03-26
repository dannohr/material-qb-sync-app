import React, { Component } from "react";
import axios from "axios";
import {
  MDBDataTable,
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBNavLink,
  MDBIcon
} from "mdbreact";
import "./AllUsers.css";
import DeleteUserButton from "../../../components/DeleteUserButton/DeleteUserButton";

export default class AllUsers extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      isLoading: true,
      isAuthenticating: false,
      isAuthenticated: false,
      error: false,
      message: "",
      allUsers: []
    };
  }

  removeByAttr = function(arr, attr, value) {
    console.log(attr);
    console.log(value);
    var i = arr.length;
    while (i--) {
      if (arr[i] && arr[i].hasOwnProperty(attr) && arr[i][attr] === value) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };

  async componentDidMount() {
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
      await axios
        .get("/users", {
          headers: { Authorization: `JWT ${accessString}` }
        })
        .then(response => {
          this.setState({
            allUsers: response.data.allUsers,
            message: response.data.message,
            isAuthenticated: response.data.isAuthenticated,
            isLoading: false
          });
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
  }

  handleEdit = () => {
    console.log("Edit User");
  };

  handleDelete = (userId, deleted) => {
    let allUsers = [...this.state.allUsers];

    if (deleted) {
      this.removeByAttr(allUsers, "userId", userId);
      this.setState({ allUsers: allUsers });
    } else {
      console.log("not deleted");
    }
  };

  render() {
    const users = this.state.allUsers.map((user, index) => {
      return {
        editUser: (
          <MDBRow className="mx-0 py-0">
            <MDBCol className="my-auto float-left px-0 ">
              <MDBNavLink to={"/user/" + user.userId} className="m-0 p-0">
                <MDBIcon
                  far
                  icon="edit"
                  size="large"
                  id={index}
                  onClick={this.handleEdit}
                />
              </MDBNavLink>
            </MDBCol>
            <MDBCol className="my-auto text-right px-0">
              <DeleteUserButton
                className="hover"
                userId={user.userId}
                handleDelete={this.handleDelete}
              />
            </MDBCol>
          </MDBRow>
        ),
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email
      };
    });

    const data = {
      columns: [
        {
          label: "Edit",
          field: "id",
          width: 15
        },

        {
          label: "User ID",
          field: "userId",
          sort: "asc",
          width: 10
        },
        {
          label: "First Name",
          field: "firstName",
          sort: "asc",
          width: 270
        },
        {
          label: "Last Name",
          field: "lastName",
          sort: "asc",
          width: 270
        },
        {
          label: "Username",
          field: "username",
          sort: "asc",
          width: 200
        },
        {
          label: "email",
          field: "email",
          sort: "asc",
          width: 100
        }
      ],
      rows: users
    };

    return (
      <MDBContainer>
        <h1>List of all users in database</h1>
        <MDBDataTable striped bordered hover small data={data} />
      </MDBContainer>
    );
  }
}
