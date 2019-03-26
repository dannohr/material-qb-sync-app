import { authConstants } from "../_constants";

const initialState = {
  isAuthenticating: false,
  isAuthenticated: false,
  multiCompany: false,
  username: "",
  companyLoggedIn: {
    name: "",
    id: ""
  },
  companyList: [
    {
      name: "",
      id: null
    }
  ]
};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        isLoading: true,
        user: action.user
      };

    case authConstants.LOGIN_SUCCESS:
      return {
        ...action.user
      };

    case authConstants.LOGIN_FAILURE:
      return {};

    case authConstants.LOGOUT:
      return {
        ...action.user
      };

    case authConstants.GETME_REQUEST:
      return {
        loading: true
      };

    case authConstants.GETME_SUCCESS:
      return {
        ...action.users
      };

    case authConstants.GETME_FAILURE:
      return {
        error: action.error
      };

    default:
      return state;
  }
}
