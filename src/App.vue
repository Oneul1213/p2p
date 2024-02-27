<template>
  <div>
    <RouterView />
    <Toast />
  </div>
</template>

<script setup lang="ts">
import type { ToastConfig } from '@/common/type';

import { onMounted, provide } from 'vue';
import { RouterView } from 'vue-router';

import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

import { toastAddKey } from "@/constant/injectionKey";
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const toast = useToast();

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

onMounted(() => {
  const loginUserId = localStorage.getItem("login_user_id");
  const loginUserNickname = localStorage.getItem("login_user_nickname");
  if (loginUserId !== null && loginUserNickname !== null) {
    userInfo.value = {
      id: Number(loginUserId),
      nickname: loginUserNickname,
    }
  }
})

function toastAdd(toastConfig: ToastConfig) {
  toast.add({
    severity: toastConfig.severity,
    summary: toastConfig.summary,
    detail: toastConfig.detail,
    life: toastConfig.life,
  });
}

provide(toastAddKey, toastAdd);
</script>

<style scoped>
</style>
