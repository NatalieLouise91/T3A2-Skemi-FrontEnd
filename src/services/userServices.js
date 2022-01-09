import skemiAPI from "../config/api";

// async function to fetch all users from api 

export async function getUsers() {
    const response = await skemiAPI.get("/api/users");
    console.log(response);
    return response.data;
}

// async function to fetch user by id

export async function getUserById(id) {
    const response = await skemiAPI.get(`/api/users/${id}`);
    return response.data;
}