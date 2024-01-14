import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', () => {
    const tableData = ref([
        {
            title: "제목1",
            content: "내용은 이렇게"
        },
        {
            title: "제목2",
            content: "내용은 이렇게"
        },
        {
            title: "제목3",
            content: "내용은 이렇게"
        },
        {
            title: "제목4",
            content: "내용은 이렇게"
        },
        {
            title: "제목5",
            content: "내용은 이렇게"
        },
        {
            title: "제목6",
            content: "내용은 이렇게"
        },
        {
            title: "제목7",
            content: "내용은 이렇게"
        },
        {
            title: "제목8",
            content: "내용은 이렇게"
        },
        {
            title: "제목9",
            content: "내용은 이렇게"
        },
        {
            title: "제목10",
            content: "내용은 이렇게"
        },
        {
            title: "제목11",
            content: "내용은 이렇게"
        },
    ]);

    return {
        tableData,
    }
})
