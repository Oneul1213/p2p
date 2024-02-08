import type { InjectionKey } from 'vue';
import type { ToastConfig } from '@/common/type';

const toastAddKey = Symbol() as InjectionKey<(toastConfig: ToastConfig) => void>;

export {
    toastAddKey,
}