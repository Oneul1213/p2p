import ApiService from "@/common/ApiService";
import type { CommentRequestBody } from "@/common/type";
import { defineStore } from "pinia";

export const useCommentStore = defineStore("comment", () => {
    async function requestCreateComment(params: CommentRequestBody) {
        return ApiService.request("post", "/v1/comment", params).then(({ data }) => data);
    }

    async function requestDeleteComment(params: any) {
        const { commentId } = params;
        return ApiService.request("delete", `/v1/comment/:${commentId}`).then(({ data }) => data);
    }

    return {
        requestCreateComment,
        requestDeleteComment,
    }
})