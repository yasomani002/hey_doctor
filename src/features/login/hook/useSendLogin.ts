import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/api/axiosInstance";
import { API_ENDPOINT } from "@/api/endpoints";

type payload = {
    email: string,
    password: string
}
const submitLoginData = async (payload: payload): Promise<any> => {
    const response = await axiosInstance.post(
        API_ENDPOINT.LOGIN,
        payload
    );
    return response.data;
};

export const useSubmitLoginData = () => {
    return useMutation({
        mutationFn: submitLoginData,
    });
};