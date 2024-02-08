<template>
  <div>
    <RouterView />
    <Toast />
  </div>
</template>

<script setup lang="ts">
import type { ToastConfig } from '@/common/type';

import { provide } from 'vue';
import { RouterView } from 'vue-router';

import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

import { toastAddKey } from "@/constant/injectionKey";

const toast = useToast();

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
