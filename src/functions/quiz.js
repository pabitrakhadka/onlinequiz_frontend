import { getURL } from ".";
import { server } from "@/functions/server";


const QUIZAPI = "/api/quiz"

export async function getQuiz(data) {
    return await server.get(getURL(`${QUIZAPI}?${data}`))
}

