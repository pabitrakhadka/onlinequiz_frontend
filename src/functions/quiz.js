import { getURL } from ".";
import { server } from "@/functions/server";


const QUIZAPI = "/api/quiz"

//Get Quiz or Question
export async function getQuiz(data) {
    console.log('data=', data);
    return await server.get(getURL(`${QUIZAPI}?${data}`))
}
//Post Quiz
export async function postQuiz(data) {
    return await server.post(getURL(QUIZAPI), data)
}
//Delete Quiz
export async function DeleteQuiz(id) {

    return await server.delete(getURL(`${QUIZAPI}?${id}`))
}
//Update Quiz
export async function UpdateQuiz(id, data) {
    return await server.put(getURL(`${QUIZAPI}?${id}`), data);
}




