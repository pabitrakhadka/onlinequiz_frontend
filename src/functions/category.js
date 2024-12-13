import { getURL } from ".";
import { server } from "@/functions/server";


const CATEGORY_API = "/api/category";

// POST API
export async function postCategory(data) {
    return await server.post(getURL(CATEGORY_API), data);
}

// GET API
export async function getCategories(params) {

    return await server.get(getURL(`${CATEGORY_API}?${params}`));
}

// PUT API
export async function putCategory(data) {
    return await server.put(getURL(CATEGORY_API), data);
}

// DELETE API
export async function deleteCategory(id) {
    return await server.delete(getURL(`${CATEGORY_API}?id=${id}`));
}