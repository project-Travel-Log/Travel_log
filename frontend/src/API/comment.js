import apiClient from "./axios";

export const getComments = (targetType, targetId) => {
    return apiClient.get(`/api/comments/${targetType}/${targetId}`);
};

export const createComment = (targetType, targetId, content) => {
    return apiClient.post(`/api/comments/${targetType}/${targetId}`, { content });
};
