import { getURL } from ".";
import { server } from "@/functions/server";


const CONTACT_API = "/api/contactData"

//Get function
export async function getContactData(data) {

    return await server.get(getURL(`${CONTACT_API}?${data}`))
}
//Post function

export async function postContactData(data) {

    return await server.post(getURL(CONTACT_API), data)
}
//Delete function

export async function deleteContact(data) {

    return await server.delete(getURL(`${CONTACT_API}?${data}`))
}

