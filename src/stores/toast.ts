import { type InjectionKey } from 'vue'
import { defineStore } from 'pinia'
import type { ToastConfig } from '@/common/type';

export const useToastStore = defineStore('toast', () => {
    const toastAddKey = Symbol() as InjectionKey<(toastConfig: ToastConfig) => void>;

    return {
        toastAddKey,
    }
})
