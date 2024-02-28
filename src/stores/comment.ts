import ApiService from "@/common/ApiService";
import type { CommentRequestBody } from "@/common/type";
import { defineStore } from "pinia";

export const useCommentStore = defineStore("comment", () => {
    async function requestCreateComment(params: CommentRequestBody) {
        return ApiService.request("post", `/v1/posts/${params.postId}/comment`, params).then(({ data }) => data);
    }

    async function requestDeleteComment(params: any) {
        const { commentId } = params;
        return ApiService.request("delete", `/v1/comments/${commentId}`).then(({ data }) => data);
    }

    async function requestUpdateComment(params: any) {
        const { commentId, comment } = params;
        return ApiService.request("put", `/v1/comments/${commentId}`, comment).then(({ data }) => data);
    }

    return {
        requestCreateComment,
        requestDeleteComment,
        requestUpdateComment,
    }
})