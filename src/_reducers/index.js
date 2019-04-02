import { combineReducers } from "redux";
import { authentication } from "./authentication.reducer";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";
import { qb } from "./qb.reducer";
import { customer } from "./customer.reducer";

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  qb,
  customer
});

export default rootReducer;
