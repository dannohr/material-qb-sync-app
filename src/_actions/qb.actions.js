import { qbConstants } from "../_constants";
import { qbService } from "../_services";
import { alertActions } from "./";

export const qbActions = {
  login, //log in new user
  logout, // log existing user out
  loginAndGetCompany,
  getCompany,
  getCustomer,
  getAllCustomers,
  postAllCustomersToDB // copy all Quickbooks customers to local db
};

function login() {
  return dispatch => {
    dispatch(request({ type: qbConstants.LOGIN_REQUEST }));

    return qbService.login().then(
      data => {
        dispatch(success({ type: qbConstants.LOGIN_SUCCESS }, data));
      },
      error => {
        dispatch(failure({ type: qbConstants.LOGIN_FAILURE }, error));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function logout() {
  return dispatch => {
    dispatch(request({ type: qbConstants.LOGOUT_REQUEST }));

    return qbService.logout().then(
      data => {
        dispatch(success({ type: qbConstants.LOGOUT_SUCCESS }, data));
      },
      error => {
        console.log(error);
        dispatch(failure({ type: qbConstants.LOGOUT_FAILURE }, "error"));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function request(type) {
  return { ...type };
}
function success(type, data) {
  // console.log(data);
  return { ...type, data };
}
function failure(type, error) {
  return { ...type, error };
}

function getCompany() {
  return dispatch => {
    dispatch(request({ type: qbConstants.GETCOMPANY_REQUEST }));

    return qbService.getCompany().then(
      data => {
        if (!data.error) {
          dispatch(
            success({ type: qbConstants.GETCOMPANY_SUCCESS }, data.CompanyInfo)
          );
        } else {
          dispatch(
            failure({ type: qbConstants.GETCOMPANY_FAILURE }, "not working")
          );
        }
      },
      error => {
        dispatch(failure({ type: qbConstants.LOGIN_FAILURE }, error));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function loginAndGetCompany() {
  return dispatch => {
    return dispatch(login()).then(() => {
      return dispatch(getCompany());
    });
  };
}

function getAllCustomers() {
  return dispatch => {
    dispatch(request({ type: qbConstants.GETALLCUSTOMERS_REQUEST }));

    return qbService.getCustomers().then(
      data => {
        // console.log("data from getCustomers action");
        // console.log(data);
        if (!data.error) {
          dispatch(
            // console.log({ type: qbConstants.GETALLCUSTOMERS_SUCCESS }, data),
            success({ type: qbConstants.GETALLCUSTOMERS_SUCCESS }, data)
          );
        } else {
          dispatch(
            failure(
              { type: qbConstants.GETALLCUSTOMERS_FAILURE },
              "not working"
            )
          );
        }
      },
      error => {
        dispatch(failure({ type: qbConstants.LOGIN_FAILURE }, error));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function getCustomer(id) {
  return dispatch => {
    dispatch(request({ type: qbConstants.GETONECUSTOMERS_REQUEST }));

    return qbService.getCustomer(id).then(
      response => {
        dispatch(
          success(
            { type: qbConstants.GETONECUSTOMERS_SUCCESS },
            response.QueryResponse
          )
        );
      },
      error => {
        dispatch(failure({ type: qbConstants.GETONECUSTOMER }, error));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function postAllCustomersToDB(bodyArr) {
  return dispatch => {
    dispatch(request({ type: qbConstants.POST_ALL_QB_CUSTOMER_TO_DB_REQUEST }));

    return qbService.copyQBCustomerAndAddressToDB(bodyArr).then(
      // return qbService.testFunc(bodyArr).then(
      response => {
        console.log(response);
        dispatch(
          success(
            { type: qbConstants.POST_ALL_QB_CUSTOMER_TO_DB_SUCCESS }
            //response.QueryResponse
          )
        );
      },

      error => {
        console.log(error);
        dispatch(
          failure(
            { type: qbConstants.POST_ALL_QB_CUSTOMER_TO_DB_FAILURE },
            error
          )
        );
        dispatch(alertActions.error(error));
      }
    );
  };
}

// function copyQBCustomerAndAddressToDB(bodyArr) {
//   return dispatch => {
//     dispatch(request({ type: qbConstants.POST_ALL_QB_CUSTOMER_TO_DB_REQUEST }));

//     // first add the billing address
//     // until I find a more elegant way, for now we're just going to try to add
//     // both a billing and shipping address everytime, regardless of if there
//     // actally is one.   qbService.copyQBdataToDB will return an empty promise
//     // is there isn't an address.

//     //go through each client to get current background list
//     return Promise.all(
//       bodyArr.map(function(currCustomer) {
//         console.log("ADDING NEW CUSTOMER", currCustomer);

//         let billAddr = currCustomer.BillAddr
//           ? {
//               name: null,
//               addressLine1: currCustomer.BillAddr.Line1,
//               city: currCustomer.BillAddr.City,
//               state: currCustomer.BillAddr.CountrySubDivisionCode,
//               zip: currCustomer.BillAddr.PostalCode,
//               qbId: currCustomer.BillAddr.Id
//             }
//           : {};

//         let shipAddr = currCustomer.ShipAddr
//           ? {
//               name: null,
//               addressLine1: currCustomer.ShipAddr.Line1,
//               city: currCustomer.ShipAddr.City,
//               state: currCustomer.ShipAddr.CountrySubDivisionCode,
//               zip: currCustomer.ShipAddr.PostalCode,
//               qbId: currCustomer.ShipAddr.Id
//             }
//           : null;

//         return qbService.copyQBdataToDB(billAddr, "address").then(
//           response => {
//             let billAddrId = response.data ? response.data.id : null;

//             //Then add the shipping address
//             qbService.copyQBdataToDB(shipAddr, "address").then(response => {
//               console.log(response);
//               let shipAddrId = response.data ? response.data.id : null;

//               //then add the customer, using the above two ID's
//               let customer = {
//                 qbId: currCustomer.Id,
//                 Active: currCustomer.Active,
//                 Balance: currCustomer.Balance,
//                 CustomerName: currCustomer.DisplayName,
//                 SyncToken: currCustomer.SyncToken,
//                 ShippingAddressId: shipAddrId,
//                 BillingAddressId: billAddrId
//               };

//               qbService.copyQBdataToDB(customer, "customer").then(response => {
//                 dispatch(
//                   success(
//                     { type: qbConstants.POST_ALL_QB_CUSTOMER_TO_DB_SUCCESS },
//                     response.data
//                   )
//                 );
//               });
//             });
//           },

//           error => {
//             dispatch(
//               failure(
//                 { type: qbConstants.POST_ALL_QB_CUSTOMER_TO_DB_FAILURE },
//                 error
//               )
//             );
//             dispatch(alertActions.error(error));
//           }
//         );
//       })
//     ).finally(console.log("all done"));
//   };
// }

// function copyQBAllCustomerAndAddressToDB(currCustomer) {
//   return dispatch => {
//     dispatch(request({ type: qbConstants.POST_ALL_QB_CUSTOMER_TO_DB_REQUEST }));

//     // bodyArr.map(function(currCustomer, index) {
//     // console.log(currCustomer);
//     // let promises = [];

//     // if (currCustomer.hasOwnProperty("BillAddr")) {
//     let billAddr = {
//       name: null,
//       addressLine1: currCustomer.BillAddr.Line1,
//       city: currCustomer.BillAddr.City,
//       state: currCustomer.BillAddr.CountrySubDivisionCode,
//       zip: currCustomer.BillAddr.PostalCode,
//       qbId: currCustomer.BillAddr.Id
//     };
//     console.log("Adding Billing ", billAddr);
//     // let billAddrPromise = addAddress(billAddr);

//     // promises.push(billAddrPromise);
//     // }

//     // if (currCustomer.hasOwnProperty("ShipAddr")) {
//     let shipAddr = {
//       name: null,
//       addressLine1: currCustomer.ShipAddr.Line1,
//       city: currCustomer.ShipAddr.City,
//       state: currCustomer.ShipAddr.CountrySubDivisionCode,
//       zip: currCustomer.ShipAddr.PostalCode,
//       qbId: currCustomer.ShipAddr.Id
//     };
//     console.log("Adding Shipping ", shipAddr);
//     // let shipAddrPromise = addAddress(shipAddr);
//     // return shipAddr
//     // promises.push(shipAddrPromise);
//     // }
//     return pleaseworkthistime(shipAddr, billAddr);
//     // return Promise.all([loadData(shipAddr), loadData(billAddr)]).then(data => {
//     //   console.log("all done");
//     //   console.log(data);
//     //   return data;
//     // });
//     // });
//   };
// }
