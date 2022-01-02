import axios from "axios";

const skemiAPI = axios.create({
   baseURL: "http://localhost:3000",
});

skemiAPI.interceptors.request.use((req) => {
   const token = sessionStorage.getItem("token");
   console.log("Set token header: ", token);
   if (token) {
      req.headers["Authorization"] = `Bearer ${token}`;
   }
   return req
})
export default skemiAPI;