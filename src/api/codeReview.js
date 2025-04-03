import axios from "./axios";

export const getCodeReview = async (patch) =>{
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
