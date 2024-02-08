import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', () => {
  const key = ref<number>(0);
  function keyGen() {
    return key.value++;
  }

  return {
    keyGen,
  }
})
