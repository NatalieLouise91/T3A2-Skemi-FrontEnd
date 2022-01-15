import axios from "axios";

//variable to set axios api url
const skemiAPI = axios.create({
   baseURL: "http://localhost:3000",
});

// getting and setting auth token
skemiAPI.interceptors.request.use((req) => {
   const token = sessionStorage.getItem("token");
   console.log("Set token header: ", token);
   if (token) {
      req.headers["Authorization"] = `Bearer ${token}`;
   }
   return req;
});
export default skemiAPI;
