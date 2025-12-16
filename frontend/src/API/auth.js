import apiClient from "./axios";

// 회원가입
export const signUp = (id, pw, gender, email, name, phone) => {
    return apiClient.post('/auth/signUp',{
        id,
        pw,
        gender,
        email,
        name,
        phone,
    });
};

// export const login = (id, pw)=>{

// }