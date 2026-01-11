import apiClient from "./axios"

export const getReviewList = (page = 1, keyword = "") => {
    return apiClient.get("/api/review", {
        params: {
            page,
            limit: 10,
            keyword
        }
    });
};

export const reviewWrite = (formData) => {
    return apiClient.post("/api/review/write", formData)
}

export const getReviewDetail = (id) => {
    return apiClient.get(`/api/review/${id}`)
}
