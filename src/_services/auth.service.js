import axios from "axios";
import { authHeader } from "../_helpers";

export const authService = {
  login,
  logout,
  getMe
};

function login(username, password) {
  return axios
    .post("/api/login", {
      username,
      password
    })
    .then(response => {
      // console.log(response);
      let companyList = response.data.company;

      let companyLoggedIn = {};

      if (companyList.length === 1) {
        companyLoggedIn = {
          name: companyList[0].name,
          id: companyList[0].id
        };
      }
      let multiCompany = companyList.length > 1 ? true : false;

      let isAuthenticated =
        companyList.length > 1 ? false : response.data.isAuthenticated;

      let loggedInUser = {
        isAuthenticated,
        username,
        multiCompany,
        companyLoggedIn,
        companyList: companyList,
        message: response.data.message
      };

      localStorage.setItem("JWT", response.data.token);
      localStorage.setItem("companyId", companyLoggedIn.id);

      return loggedInUser;
    })
    .catch(error => {
      if (
        error.response.data === "bad username" ||
        error.response.data === "passwords do not match" ||
        error.response.status === 401
      ) {
        return {
          isAuthenticated: false,
          loggedIn: false,
          showError: true,
          isLoading: false,
          message: "bad username or password"
        };
      }
    });
}

function logout() {
  localStorage.removeItem("JWT");
  localStorage.removeItem("companyId ");
  return {
    isAuthenticated: false,
    showError: false,
    isLoading: false
  };
}

function getMe() {
  const companyId = parseInt(localStorage.getItem("companyId"), 10);
  return axios
    .get("/api/me?companyId=" + companyId, {
      headers: authHeader()
    })
    .then(response => {
      let companyLoggedIn = response.data.company;
      let companyList = response.data.company;
      let multiCompany = false;

      let loggedInUser = {
        isAuthenticated: response.data.isAuthenticated,
        username: response.data.username,
        multiCompany,
        companyLoggedIn,
        companyList,
        message: "user already logged in"
      };

      return loggedInUser;
    })
    .catch(error => {
      console.error(error.response.data);
      localStorage.removeItem("JWT"); //clear expired
      localStorage.removeItem("companyId");
    });
}

// function handleResponse(response) {
//   console.log(response);
//   return response.text().then(text => {
//     const data = text && JSON.parse(text);
//     console.log(data);
//     if (!response.ok) {
//       if (response.status === 401) {
//         // auto logout if 401 response returned from api
//         logout();
//         // location.reload(true);
//       }

//       const error = (data && data.message) || response.statusText;
//       return Promise.reject(error);
//     }

//     return data;
//   });
// }
