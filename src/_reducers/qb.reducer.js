import { qbConstants } from "../_constants";

const initialState = {
  isLoading: false,
  qbConnected: false,
  companyData: {},
  customers: { isLoading: true }
};

export function qb(state = initialState, action) {
  // console.log(action);
  switch (action.type) {
    case qbConstants.LOGIN_REQUEST:
      return {
        companyData: {},
        isLoading: true,
        qbConnected: false
      };

    case qbConstants.LOGIN_SUCCESS:
      return {
        isLoading: false,
        ...action.data,
        companyData: {}
      };

    case qbConstants.LOGIN_FAILURE:
      return { isLoading: false, qbConnected: false };

    case qbConstants.LOGOUT_REQUEST:
      return {
        ...state
      };

    case qbConstants.LOGOUT_SUCCESS:
      return {
        isLoading: false,
        qbConnected: false,
        companyData: {}
      };

    case qbConstants.LOGOUT_FAILURE:
      return {
        ...state
      };

    case qbConstants.GETCOMPANY_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case qbConstants.GETCOMPANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        qbConnected: true,
        companyData: action.data
      };

    case qbConstants.GETCOMPANY_FAILURE:
      return {
        isLoading: false,
        qbConnected: false,
        companyData: {}
      };

    case qbConstants.GETALLCUSTOMERS_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case qbConstants.GETALLCUSTOMERS_SUCCESS:
      console.log(action);
      return {
        ...state,
        isLoading: false,
        qbConnected: true,
        customers: action.data
      };

    case qbConstants.GETALLCUSTOMERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        qbConnected: false,
        customers: null
      };

    case qbConstants.GETONECUSTOMERS_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case qbConstants.GETONECUSTOMERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        qbConnected: true,
        customers: action.data
      };

    case qbConstants.GETONECUSTOMERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        qbConnected: false,
        customers: null
      };

    default:
      return state;
  }
}
