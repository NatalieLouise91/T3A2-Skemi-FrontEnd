//file declares functions for signup and interact with the api and database

import skemiAPI from "../config/api";


// creates/posts an email to the database
export async function forgotPassword(data) {
   const response = await skemiAPI.post("/api/forgot_password", data);
   console.log(response);
   return response.data.email;
}

export async function resetPassword(data) {
   const response = await skemiAPI.post("/api/forgot_password", data);
   console.log(response);
   return response.data.email;
}

// const baseURL = skemiAPI;

// export const forgotPassword = (email) => {
//    return fetch(`${baseURL}/forgot_password`, {
//       credentials: "include",
//       method: "POST",
//       headers: {
//          "Content-Type": "application/json",
//       },
//       body: JSON.stringify(email),
//    })
//       .then((res) => res.json())
//       .then((response) => {
//          alert(response.alert);
//       })
//       .catch(console.log);
// };