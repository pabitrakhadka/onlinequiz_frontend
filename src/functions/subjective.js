import { server } from "@/axois/server";
import { getURL } from ".";


const subjectiveApi = '/api/subjective';

const SUBJECTIVE_PDF_API = '/api/pdfFileUpload';
//This is post pdf file
export async function postPdfQuestion(params) {

    return server.post(getURL(SUBJECTIVE_PDF_API), params);
}

export function getPdfQuestions(id) {
    return server.get(getURL(`${SUBJECTIVE_PDF_API}?${id}`));
}
export function deletePdfQuestion(id) {
    return server.delete(getURL(`${SUBJECTIVE_PDF_API}?${id}`));
}


export async function getChapterWiseSubjectiveQuestion(params) {
    return server.get(getURL(`${subjectiveApi}?${params}`));
}
//This function is Post Subjective Question Only || POST MEthod
export async function PostSubjectiveQuestion(params) {
    return server.post(getURL(subjectiveApi), params);
}

//This function is Get All Category from api/subjective api  || Get Method
export async function getAPI_Subjective(params) {
    return server.get(getURL(`${subjectiveApi}?${params}`));
}