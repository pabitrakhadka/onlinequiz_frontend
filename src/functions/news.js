import { getURL } from ".";
import { server } from "@/functions/server";
const newsapi = '/api/news';

//Get News
export async function getNews(id) {
    return await server.get(getURL(`${newsapi}?${id}`));
}
//POST News
export async function postNews(data) {
    return await server.post(getURL(newsapi), data);
}

//UPdate News
export async function updateNews(id, data) {
    return await server.put(getURL(`${newsapi}?${id}`), data);
}

// Delete News
export async function DeleteNews(id) {
    return await server.delete(getURL(`${newsapi}?${id}`));
}