import { defineStore } from "pinia";
import ApiService from "@/common/ApiService";

export const useAuthStore = defineStore("auth", () => {

    async function requestSignup(params: any) {
        return await ApiService.request("post", "/v1/auth/signup", params, true).then(({ data }) => data);
    }

    return {
        requestSignup,
    };
})