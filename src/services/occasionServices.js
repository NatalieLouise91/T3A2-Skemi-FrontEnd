//file declares functions for crud operations on events/occasions and interact with the api and database

import skemiAPI from "../config/api";

//gets all event records from database
export async function getOccasions() {
   const response = await skemiAPI.get("/api/events");
   console.log(response);
   return response.data;
}

// creates/posts an occasion/event to the database
export async function createOccasion(data) {
   const response = await skemiAPI.post("/api/events", data);
   console.log(response);
   return response.data;
}

//gets specific occasions/events by id
export async function getOccasionById(id) {
   const response = await skemiAPI.get(`/api/events/${id}`);
   console.log(response);
   return response.data;
}

// deletes an occasion/event record from the database
export async function deleteOccasion(id) {
   const response = await skemiAPI.delete(`/api/events/${id}`);
   console.log(response.data);
   return response.data;
}

//put request to the database to update an event/occasion record
export async function updateOccasion(data) {
   const response = await skemiAPI.put(`/api/events/${data.id}`, data);
   console.log(response.data);
   return response.data;
}
