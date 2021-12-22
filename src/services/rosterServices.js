import skemiAPI from "../config/api";

export async function getRosters() {
    const response = await skemiAPI.get("/api/rosters");
    console.log(response);
    return response.data;
}

export async function createRoster(data) {
    const response = await skemiAPI.post("/api/rosters", data);
    console.log(response);
    return response.data;
}

export async function getRoster(id) {
    const response = await skemiAPI.get(`/api/rosters/${id}`);
    return response.data;
}

export async function deleteRoster(id) {
    const response = await skemiAPI.delete(`/api/rosters/${id}`);
    console.log(response.data);
    return response.data;
}