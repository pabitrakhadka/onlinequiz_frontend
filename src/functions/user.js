import { getURL } from ".";
import { server } from "./server";

const REGISTER_API = "/api/users/register";

export async function postRegister(data) {
    return await server.post(getURL(REGISTER_API), data);
}

const Login_Api = "/api/users/login";
const USER_API = "/api/users/user";
const LOGOUT_API = "/api/users/logout";

export async function postLogin(data) {
    return await server.post(getURL(Login_Api), data);
}
//get User Data from id
export async function getUserData(userId) {
    return await server.get(getURL(`${USER_API}?userId=${userId}`));
}

export async function postLogout() {
    return await server.post(getURL(LOGOUT_API));
}


export async function getAllUser() {
    return await server.get((getURL(USER_API)));

}