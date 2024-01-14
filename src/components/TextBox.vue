<template>
    <div class="textbox-component">
        <span class="p-float-label">
            <InputText v-if="type !== 'password'" id="text" type="text" v-model="value" />
            <Password v-else id="text" v-model="value" toggleMask :feedback="false" />
            <label for="text">{{ props.placeholder }}</label>
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

interface Props {
    modelValue: string,
    placeholder?: string,
    type?: string,
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: "",
    placeholder: "",
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    }
});
</script>

<style scoped lang="scss">
.p-inputtext {
    min-width: 17.375rem;
}

</style>