import apiClient from "./axios";

export const toggleLike = (targetType, targetId) => {
    return apiClient.post("/api/like", {
    target_type: targetType,
    target_id: targetId
    });
};
