import skemiAPI from "../config/api";

export async function getOccasions() {
   const response = await skemiAPI.get("/api/events");
   console.log(response);
   return response.data;
}
