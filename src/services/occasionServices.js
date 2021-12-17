import skemiAPI from "../config/api";

export async function getOccasions() {
   const response = await skemiAPI.get("/api/events");
   console.log(response);
   return response.data;
}

export async function createOccasion(data) {
   const response = await skemiAPI.post("/api/events", data);
   console.log(response);
   return response.data;
}

export async function getOccasionById(id) {
   const response = await skemiAPI.get(`/api/events/${id}`);
   console.log(response);
   return response.data;
}

export async function deleteOccasion(id) {
   const response = await skemiAPI.delete(`/api/events/${id}`);
   console.log(response.data);
   return response.data;
}

export async function updateOccasion(data) {
   const response = await skemiAPI.put(`/api/events/${data.id}`, data);
   console.log(response.data);
   return response.data;
}
