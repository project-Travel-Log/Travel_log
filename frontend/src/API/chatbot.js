import apiClient from "./axios";

export const sendChatMessage = (message) => {
    return apiClient.post('/api/chatbot/ask', {
        request_message: message
    });
};