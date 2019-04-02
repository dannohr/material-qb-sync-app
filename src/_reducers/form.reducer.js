// import {
//   formReducer
//   //   createForms // optional
// } from "react-redux-form";

const initialUserState = {
  username: "jdoe",
  firstName: "John",
  lastName: "Doe"
};

const initialGoat = {
  color: "",
  breed: ""
};

// export const userForm = formReducer("userForm", initialUserState);
export const forms = { user: initialUserState, goat: initialGoat };
