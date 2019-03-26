export function authHeader() {
  // return authorization header with jwt token
  // let user = JSON.parse(localStorage.getItem('user'));
  // if (user && user.token) {
  // return { 'Authorization': 'Bearer ' + user.token };
  // } else {
  //     return {};
  // }

  const accessString = localStorage.getItem("JWT");
  if (accessString) {
    return { Authorization: "JWT " + accessString };
  } else {
    return {};
  }
}
