import axios from "./axios";

export const sendCodeReview = async (patch) =>{
    try {
        const response = await axios.post(
            "/test/testConnect",
            patch, // 문자열 그대로 보냄
            {
                headers: {
                    'Content-Type': 'text/plain',
                },
            }
        )
        return response.data;

    }catch(error){
        console.log("error",error);
        throw error;
    }
};


export const getCodeReviewHistory = async () =>{
    try {
        const response = await axios.post("/test/getCodeReviewHistory");
        console.log("response",response);
        return response.data;
    }catch(error){
        console.log("error",error);
        throw error;
    }
};

export const deleteCodeReviewHistory = async (seq) =>{
    try {
        const response = await axios.post("/test/deleteCodeReviewHistory", null, {
            params: {
                seq: Number(seq)
            }
        });
        return response.data;
    }catch(error){
        console.log("error",error);
        throw error;
    }
};