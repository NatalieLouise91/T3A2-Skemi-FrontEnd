//file declares functions for crud operations on rosters and interacts with the api and database

import skemiAPI from "../config/api";

//gets all event records from database
export async function getRosters() {
   const response = await skemiAPI.get("/api/rosters");
   console.log(response);
   return response.data;
}

// creates/posts a roster to the database
export async function createRoster(data) {
   const response = await skemiAPI.post("/api/rosters", data);
   console.log(response);
   return response.data;
}

//gets specific roster by id
export async function getRosterById(id) {
   const response = await skemiAPI.get(`/api/rosters/${id}`);
   return response.data;
}

// deletes a roster record from the database
export async function deleteRoster(id) {
   const response = await skemiAPI.delete(`/api/rosters/${id}`);
   console.log(response.data);
   return response.data;
}

//put request to the database to update a roster record
export async function updateRoster(data) {
   const response = await skemiAPI.put(`/api/rosters/${data.id}`, data);
   console.log(response.data);
   return response.data;
}
