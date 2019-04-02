import { qbConstants } from "../_constants";
import { qbService } from "../_services";
import { alertActions } from "./";
import axios from "axios";

export const qbActions = {
  login, //log in new user
  logout, // log existing user out
  loginAndGetCompany,
  getCompany,
  getCustomer,
  getAllCustomers,
  postAllCustomersToDB, // copy all Quickbooks customers to local db
  postQbAddressToDB,
  copyQBCustomerAndAddressToDB
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
        console.log("date from getCustomers action");
        console.log(data);
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

function postAllCustomersToDB(bodyArr, qbTable) {
  return dispatch => {
    dispatch(request({ type: qbConstants.POST_ALL_QB_CUSTOMER_TO_DB_REQUEST }));

    return qbService.copyQBdataToDB(bodyArr, qbTable).then(
      response => {
        dispatch(
          success(
            { type: qbConstants.POST_ALL_QB_CUSTOMER_TO_DB_SUCCESS },
            response.QueryResponse
          )
        );
      },

      error => {
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

function copyQBCustomerAndAddressToDB(bodyArr) {
  console.log(bodyArr.BillAddr);

  return dispatch => {
    dispatch(request({ type: qbConstants.POST_ALL_QB_CUSTOMER_TO_DB_REQUEST }));

    let billAddr = bodyArr.BillAddr
      ? {
          name: null,
          addressLine1: bodyArr.BillAddr.Line1,
          city: bodyArr.BillAddr.City,
          state: bodyArr.BillAddr.CountrySubDivisionCode,
          zip: bodyArr.BillAddr.PostalCode,
          qbId: bodyArr.BillAddr.Id
        }
      : {};

    let shipAddr = bodyArr.ShipAddr
      ? {
          name: null,
          addressLine1: bodyArr.ShipAddr.Line1,
          city: bodyArr.ShipAddr.City,
          state: bodyArr.ShipAddr.CountrySubDivisionCode,
          zip: bodyArr.ShipAddr.PostalCode,
          qbId: bodyArr.ShipAddr.Id
        }
      : null;

    // first add the billing address
    // until I find a more elegant way, for now we're just going to try to add
    // both a billing and shipping address everytime, regardless of if there
    // actally is one.   qbService.copyQBdataToDB will return an empty promise
    // is there isn't an address.
    return qbService.copyQBdataToDB(billAddr, "address").then(
      response => {
        let billAddrId = response.data ? response.data.id : null;

        //Then add the shipping address
        qbService.copyQBdataToDB(shipAddr, "address").then(response => {
          console.log(response);
          let shipAddrId = response.data ? response.data.id : null;

          //then add the customer, using the above two ID's
          let customer = {
            qbId: bodyArr.Id,
            Active: bodyArr.Active,
            Balance: bodyArr.Balance,
            CustomerName: bodyArr.DisplayName,
            SyncToken: bodyArr.SyncToken,
            ShippingAddressId: shipAddrId,
            BillingAddressId: billAddrId
          };

          qbService.copyQBdataToDB(customer, "customer").then(response => {
            dispatch(
              success(
                { type: qbConstants.POST_ALL_QB_CUSTOMER_TO_DB_SUCCESS },
                response.data
              )
            );
          });
        });
      },

      error => {
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

function postQbAddressToDB(config) {
  return dispatch => {
    dispatch(request({ type: qbConstants.POST_QB_ADDRESS_TO_DB_REQUEST }));

    axios
      .post("/api/address", config)
      .then(response => {
        if (response) {
          dispatch(
            success(
              { type: qbConstants.POST_QB_ADDRESS_TO_DB_SUCCESS },
              response.data.QueryResponse
            )
          );
        } else {
          console.log("failing");
          dispatch(
            failure(
              { type: qbConstants.POST_QB_ADDRESS_TO_DB_FAILURE },
              "not working"
            )
          );
        }
      })
      .catch(error => {
        dispatch(
          failure({ type: qbConstants.POST_QB_ADDRESS_TO_DB_FAILURE }, error)
        );
        dispatch(
          alertActions.error({
            error: error
          })
        );
      });
  };
}
