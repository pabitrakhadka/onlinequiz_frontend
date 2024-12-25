import { getURL } from ".";
import { server } from "./server";

const REGISTER_API = "/api/user";
const Login_Api = "/api/userlogin";
const Auth_Status = "/api/auth/status";



//Check Auth Status:
export async function checkAuthStatus() {
    return await server.get(getURL(Auth_Status));
}
//register
export async function postUser(data) {
    return await server.post(getURL(REGISTER_API), data);
}

//for login 
export async function postLogin(data) {
    return await server.post(getURL(Login_Api), data);
}

export async function putUser() {
    return await server.post(getURL(LOGOUT_API));
}


export async function deleteUser() {
    return await server.get((getURL(USER_API)));

}