import { ref } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/common/type";

export const useUserStore = defineStore("user", () => {
    const userInfo = ref<User>();

    return {
        userInfo,
    }
})