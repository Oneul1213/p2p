import { ref } from 'vue'
import { defineStore } from 'pinia'
import ApiService from '@/common/ApiService';

export const usePostStore = defineStore('post', () => {
    const tableData = ref([]);

    async function requestPostList() {
        return await ApiService.request("get", "/v1/posts?page=1").then(({ data }) => data);
    }

    async function requestPostDetail(params: any) {
        const { postId } = params;
        return await ApiService.request("get", `/v1/post?postId=${postId}`).then(({ data }) => data);
    }

    return {
        tableData,

        requestPostList,
        requestPostDetail,
    }
})
