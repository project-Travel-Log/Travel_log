import apiClient from "./axios";

export const check = (field, value) =>{
    return apiClient.post('/api/check' , {field, value,})
}


// 회원가입
export const signUp = (formData) => {
    return apiClient.post('/api/signUp', formData);
};

// export const login = (id, pw)=>{

// }