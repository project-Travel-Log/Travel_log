import apiClient from "./axios";

export const getComments = (reviewId) =>
    apiClient.get(`/api/review/${reviewId}`);

export const createComment = (reviewId, content, parentId = null) => {
    return apiClient.post(`/api/review/${reviewId}`, {
        content,
        parent_id: parentId
    }, {
        headers: { "Content-Type": "application/json" }
    })
}

// export const updateComment = (id, content) =>
//     apiClient.put(`/api/comments/${id}`, { content });

// export const deleteComment = (id) =>
//     apiClient.delete(`/api/comments/${id}`);
