import axios from "axios";
import { authHeader } from "../_helpers";

export const qbService = {
  login,
  logout,
  getCompany,
  postQBquery,
  copyQBdataToDB,
  getCustomers,
  getCustomer,
  copyQBCustomerAndAddressToDB,
  testFunc
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

async function copyQBdataToDB(bodyArr, qbTable) {
  console.log(bodyArr);
  if (bodyArr == null || qbTable == null) {
    // when adding addresses, there may or may not be shipping and billing
    // addresses.  There's probably a cleaner way to do this, but for now I'm
    // just returning an empty promise instead of the Axios promise if there's
    // no address.

    return Promise.resolve({ response: { data: null } });
  } else {
    return axios
      .post("/api/" + qbTable, bodyArr, {
        headers: authHeader()
      })
      .then(response => {
        console.log(response.data);

        return response.data; //{ data: response.data };
      })

      .catch(err => {
        console.log(err);
        // return res.json(err);
      });
  }
}

async function copyQBCustomerAndAddressToDB(bodyArr) {
  console.log("Copying ", bodyArr, " from Quickbooks Customer");

  let billAddr = {
    name: null,
    addressLine1: bodyArr.BillAddr.Line1,
    city: bodyArr.BillAddr.City,
    state: bodyArr.BillAddr.CountrySubDivisionCode,
    zip: bodyArr.BillAddr.PostalCode,
    qbId: bodyArr.BillAddr.Id
  };

  let billAddrPromise = copyQBdataToDB(billAddr, "Address");

  let shipAddr = {
    name: null,
    addressLine1: bodyArr.ShipAddr.Line1,
    city: bodyArr.ShipAddr.City,
    state: bodyArr.ShipAddr.CountrySubDivisionCode,
    zip: bodyArr.ShipAddr.PostalCode,
    qbId: bodyArr.ShipAddr.Id
  };

  let shipAddrPromise = copyQBdataToDB(shipAddr, "Address");

  var result1 = await getGenres1();
  console.log("Woo ONE done!", result1);

  var result2 = await getGenres2();
  console.log("Woo TWO done!", result2);

  var result3 = await getGenres3();
  console.log("Woo THREE done!", result3);

  var newBillAddr = await billAddrPromise;
  console.log("New Bill Address Created", newBillAddr);

  var newShipAddr = await shipAddrPromise;
  console.log("New Bill Address Created", newShipAddr);

  return { result1, result2, result3, newBillAddr, newShipAddr, bodyArr };
}

var getGenres1 = function() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(["comedy", "drama", "action"]);
    }, 1000);
  });
};
var getGenres2 = function() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(["sports", "news", "movies"]);
    }, 2000);
  });
};
var getGenres3 = function() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(["apples", "oranges", "peaches"]);
    }, 3000);
  });
};

// We start an 'async' function to use the 'await' keyword
async function testFunc(bodyArr) {
  var result1 = await getGenres1();
  console.log("Woo ONE done!", result1);

  var result2 = await getGenres2();
  console.log("Woo TWO done!", result2);

  var result3 = await getGenres3();
  console.log("Woo THREE done!", result3);

  return { result1, result2, result3, bodyArr };
}
