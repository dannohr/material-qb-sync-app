import { customerConstants } from "../_constants";
import { customerService } from "../_services";
import { alertActions } from ".";

export const customerActions = {
  getAllCustomers,
  getCustomer
};

function request(type) {
  return { ...type };
}
function success(type, data) {
  return { ...type, data };
}
function failure(type, error) {
  return { ...type, error };
}

function getAllCustomers() {
  return dispatch => {
    dispatch(request({ type: customerConstants.GET_ALL_CUSTOMERS_REQUEST }));

    return customerService.getAllCustomers().then(
      data => {
        if (data) {
          // console.log(data);
          dispatch(
            success({ type: customerConstants.GET_ALL_CUSTOMERS_SUCCESS }, data)
          );
        } else {
          dispatch(
            failure(
              { type: customerConstants.GET_ALL_CUSTOMERS_FAILURE },
              "not working"
            )
          );
        }
      },
      error => {
        dispatch(
          failure({ type: customerConstants.GET_ALL_CUSTOMERS_FAILURE }, error)
        );
        dispatch(alertActions.error(error));
      }
    );
  };
}

function getCustomer(id) {
  return dispatch => {
    dispatch(request({ type: customerConstants.GET_CUSTOMER_REQUEST }));

    return customerService.getCustomer(id).then(
      data => {
        if (data) {
          console.log(data);
          dispatch(
            success({ type: customerConstants.GET_CUSTOMER_SUCCESS }, data)
          );
        } else {
          dispatch(
            failure(
              { type: customerConstants.GET_CUSTOMER_FAILURE },
              "not working"
            )
          );
        }
      },
      error => {
        dispatch(
          failure({ type: customerConstants.GET_CUSTOMER_FAILURE }, error)
        );
        dispatch(alertActions.error(error));
      }
    );
  };
}
