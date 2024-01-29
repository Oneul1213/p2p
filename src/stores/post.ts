import { ref } from 'vue'
import { defineStore } from 'pinia'
import ApiService from '@/common/ApiService';

export const usePostStore = defineStore('post', () => {
    const tableData = ref([]);

    async function requestTableData() {
        return await ApiService.request("get", "/v1/posts?page=1").then(({ data }) => data);
    }



    return {
        tableData,

        requestTableData,
    }
})
