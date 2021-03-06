
//file declares functions for signup and interact with the api and database

import skemiAPI from "../config/api";

export async function signUp(data) {
    const response = await skemiAPI.post(`api/auth/sign_up`,data)
    return response.data
}

export async function signIn(data) {
    const response = await skemiAPI.post(`api/auth/sign_in`,data)
    return response.data
}

export async function signOut(data) {
    sessionStorage.clear()
    return "Logged out"
}