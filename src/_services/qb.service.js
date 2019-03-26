import axios from "axios";
import { authHeader } from "../_helpers";

export const qbService = {
  login,
  logout,
  getCompany,
  postQBquery,
  copyQBdataToDB,
  getCustomers,
  getCustomer
};

function login() {
  return new Promise((resolve, reject) => {
    axios
      .get("api/qb/auth") // get the uri to use below
      .then(res => {
        // use that uri to open a window
        let uri = res.data;
        var parameters = "location=1,width=600,height=800";
        var win = window.open(uri, "connectPopup", parameters);

        var pollOAuth = window.setInterval(() => {
          try {
            if (win.document.URL.indexOf("code") !== -1) {
              window.clearInterval(pollOAuth);
              const redirectUri = win.document.URL;
              win.close();
              resolve(getCallback(redirectUri));
            }
          } catch (e) {
            //when intuit login window is open, there will be an error here
            //for every interval in the above if statement.
          }
        }, 100);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

function getCallback(redirectUri) {
  return axios
    .get(redirectUri)
    .then(res => {
      return { qbConnected: res.data.qbConnected };
    })
    .catch(err => {
      console.log(err);
    });
}

function logout() {
  return axios
    .get("/api/qb/revoke")
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
}

function getCompany() {
  return axios
    .get("/api/qb/company")
    .then(response => {
      if (response.data.error === "Not authorized") {
        console.log(response.data);
      } else {
        return response.data;
      }
    })
    .catch(err => {
      let response = { type: "error", error: err, message: err.message };
      return response;
    });
}

function getCustomers() {
  return axios
    .get("/api/qb/customer")
    .then(response => {
      if (response.data.error === "Not authorized") {
        console.log(response.data);
      } else {
        return response.data.QueryResponse;
      }
    })
    .catch(err => {
      let response = { type: "error", error: err, message: err.message };
      return response;
    });
}

function getCustomer(id) {
  return axios
    .get("/api/qb/customer/" + id)
    .then(response => {
      if (response.data.error === "Not authorized") {
        console.log(response.data);
        // return response.data;
      } else {
        // console.log(response.data);
        return response.data;
      }
    })
    .catch(err => {
      console.log(err);
    });
}

function postQBquery(queryString) {
  console.log("Querying QB data: ", queryString);
  let data = {
    body: queryString
  };
  return axios
    .post("/api/qb/query", data)
    .then(response => {
      return { data: response.data };
    })
    .catch(err => {
      console.log(err);
      // return res.json(err);
    });
}

function copyQBdataToDB(bodyArr, qbTable) {
  //bodyArr is an array of the quickbooks data to copy
  //qbTable is the Quickbooks table, i.e. Customer, Vendor, etc.

  console.log("Copying ", bodyArr, " from Quickbooks ", qbTable);

  bodyArr.forEach(arr => {
    console.log(arr);
    return axios
      .post("/api/" + qbTable, arr, {
        headers: authHeader()
      })
      .then(response => {
        console.log(response.data);
        return { data: response.data };
      })
      .catch(err => {
        // console.log(err);
        // return res.json(err);
      });
  });
}
