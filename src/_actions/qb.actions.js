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

function postAllCustomersToDB(config) {
  return dispatch => {
    dispatch(request({ type: qbConstants.POST_ALL_QB_CUSTOMER_TO_DB_REQUEST }));

    axios
      .post("/api/addCustomer", config)
      .then(response => {
        if (response) {
          dispatch(
            success(
              { type: qbConstants.POST_ALL_QB_CUSTOMER_TO_DB_SUCCESS },
              response.data.QueryResponse
            )
          );
        } else {
          console.log("failing");
          dispatch(
            failure(
              { type: qbConstants.POST_ALL_QB_CUSTOMER_TO_DB_FAILURE },
              "not working"
            )
          );
        }
      })
      .catch(error => {
        dispatch(
          failure(
            { type: qbConstants.POST_ALL_QB_CUSTOMER_TO_DB_FAILURE },
            error
          )
        );
        dispatch(
          alertActions.error({
            error: error
          })
        );
      });
  };
}
