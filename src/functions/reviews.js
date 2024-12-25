import { getURL } from ".";
import { server } from "@/functions/server";


const Reviews_API = "/api/reviews";

// POST API
export async function postReviews(data) {
    return await server.post(getURL(Reviews_API), data);
}

// GET API
export async function getReviews(params) {

    return await server.get(getURL(`${Reviews_API}?${params}`));
}

// PUT API
export async function putReviews(id, data) {
    return await server.put(getURL(`${Reviews_API}?id=${id}`), data);
}

// DELETE API
export async function deleteReviews(id) {
    return await server.delete(getURL(`${Reviews_API}?id=${id}`));
}