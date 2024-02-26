import { ref } from 'vue'
import { defineStore } from 'pinia'
import ApiService from '@/common/ApiService';
import type { Post } from '@/common/type';

export const usePostStore = defineStore('post', () => {
    const tableData = ref<Array<Post>>([]);

    async function requestPostList() {
        const page = 1;
        return await ApiService.request("get", `/v1/posts/${page}`).then(({ data }) => data);
    }

    async function requestPostDetail(params: any) {
        const { postId } = params;
        return await ApiService.request("get", `/v1/post/${postId}`).then(({ data }) => data);
    }

    async function requestSavePost(params: any) {
        return await ApiService.request("post", "/v1/post", params).then(({ data }) => data);
    }

    return {
        tableData,

        requestPostList,
        requestPostDetail,
        requestSavePost,
    }
})
