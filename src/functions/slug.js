import { getURL } from ".";
import { server } from "@/functions/server";


const Slug_API = "/api/slug";

// POST API
export async function postSlug(data) {
    return await server.post(getURL(Slug_API), data);
}

// GET API
export async function getSlugs(params) {

    return await server.get(getURL(`${Slug_API}?${params}`));
}

// PUT API
export async function putSlug(id, data) {
    return await server.put(getURL(`${Slug_API}?id=${id}`), data);
}

// DELETE API
export async function deleteSlug(id) {
    return await server.delete(getURL(`${Slug_API}?id=${id}`));
}