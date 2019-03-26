import { customerConstants } from "../_constants";

const initialState = {
  isLoading: false,
  customers: [],
  customer: null
};

export function customer(state = initialState, action) {
  switch (action.type) {
    case customerConstants.GET_ALL_CUSTOMERS_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case customerConstants.GET_ALL_CUSTOMERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        customers: action.data
      };

    case customerConstants.GET_ALL_CUSTOMERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        customers: null
      };

    case customerConstants.GET_CUSTOMER_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case customerConstants.GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        customer: action.data
      };

    case customerConstants.GET_CUSTOMER_FAILURE:
      return {
        ...state,
        isLoading: false,
        customer: null
      };

    default:
      return state;
  }
}
