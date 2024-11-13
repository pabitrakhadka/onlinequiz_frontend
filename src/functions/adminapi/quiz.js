import { getURL } from ".";
import { server } from "../server";

const REGISTER_API = "/api/users/register";
const QUIZAPI = "/api/insertquestion"
const Quiz = "/api/question";

export async function postQuiz(data) {
    return await server.post(getURL(REGISTER_API), data);
}
//test
export async function getQuestionSets(data) {
    return await server.post(getURL(`${Quiz}?${data}`));
}
export async function getQuiz(data) {
    return await server.get(getURL(`${QUIZAPI}?${data}`));
}
export async function getQuestion(data) {
    return await server.get(getURL(`${QUIZAPI}?${data}`));
}
export async function getQuestionWithOption(data) {
    return await server.get(getURL(`${QUIZAPI}?${data}`));
}

