// import { getURL } from ".";
// import { server } from "../server";

// const REGISTER_API = "/api/users/register";
// const QUIZAPI = "/api/insertquestion"
// const Quiz = "/api/question";
// const adminApi = "/api/admin/quiz";
// const QuizApi = '/api/quiz';

// export async function postQuiz(data) {
//     return await server.post(getURL(QuizApi), data);
// }
// export async function updateQuiz(id, data) {
//     return await server.put(getURL(`${QuizApi}?${id}`), data);
// }




// //test
// export async function getQuestionSets(data) {
//     return await server.post(getURL(`${Quiz}?${data}`));
// }

// export async function getQuestion(data) {
//     return await server.get(getURL(`${QUIZAPI}?${data}`));
// }
// export async function getQuestionWithOption(data) {
//     return await server.get(getURL(`${QUIZAPI}?${data}`));
// }

// export async function getAdminQuiz(params) {
//     console.log(adminApi, params)
//     return await server.get(getURL(`${adminApi}?${params}`))
// }
// export async function deleteQuestion(params) {
//     return await server.delete(getURL(`${adminApi}?${params}`))
// }
// export async function getQuiz(params) {
//     return await server.get(getURL(`${adminApi}?${params}`))
// }

