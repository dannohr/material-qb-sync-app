import axios from "axios";
import { authHeader } from "../_helpers";

export const customerService = {
  getAllCustomers,
  getCustomer
};

function getAllCustomers() {
  return axios
    .get("/api/customer", {
      headers: authHeader()
    })
    .then(response => {
      if (response.data.error === "Not authorized") {
        console.log(response.data);
        // return response.data;
      } else {
        // console.log(response.data);
        return response.data;
      }
      // return await response.data;
    })
    .catch(err => {
      console.log(err);
    });
}

function getCustomer(id) {
  return axios
    .get("/api/customer/" + id, {
      headers: authHeader()
    })
    .then(response => {
      if (response.data.error === "Not authorized") {
        console.log(response.data);
        // return response.data;
      } else {
        // console.log(response.data);
        return response.data;
      }
      // return await response.data;
    })
    .catch(err => {
      console.log(err);
    });
}
