import { httpService } from "./http.service"


const BASE_URL = 'review/'

export const reviewService = {
    getReviews,
    addReview,
    // deleteReview,
}

function addReview(toyId, review) {
    return httpService.post(BASE_URL, { review: review, toyId: toyId })
}

function getReviews(filter) {
    return httpService.get(BASE_URL,filter)

}