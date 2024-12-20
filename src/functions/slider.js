import { getURL } from ".";
import { server } from "@/functions/server";


const Slider_Api = "/api/slider_image";

// POST API
export async function postSliderImage(data) {
    return await server.post(getURL(Slider_Api), data);
}

// GET API
export async function getSliderImage(params) {

    return await server.get(getURL(`${Slider_Api}?${params}`));
}

// PUT API
export async function putSliderImage(id, data) {
    return await server.put(getURL(`${Slider_Api}?id=${id}`), data);
}

// DELETE API
export async function deleteSliderImage(id) {
    return await server.delete(getURL(`${Slider_Api}?id=${id}`));
}