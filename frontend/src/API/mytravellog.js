import apiClient from "./axios"

export const getTravellogList = (page = 1, keyword = "") => {
    return apiClient.get("/api/travelLog", {
        params: {
            page,
            limit: 10,
            keyword
        }
    });
};

export const travelLogwWrite = (formData) => {
    return apiClient.post("/api/travellog/write", formData)
}

export const gettravellogDetail = (id) => {
    return apiClient.get(`/api/travelLog/${id}`)
}