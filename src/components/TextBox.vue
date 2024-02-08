<template>
    <div class="textbox-component">
        <div class="flex felx-column gap-2">
            <FloatLabel>
                <Password v-if="props.type === 'password'" :id="keyId" v-model="value" toggleMask :feedback="false" :invalid="isInvalid" />
                <Textarea v-else-if="props.type === 'textarea'" :id="keyId" v-model="value" autoResize />
                <InputText v-else :id="keyId" type="text" v-model="value" :aria-describedby="`${keyId}-help`" :invalid="isInvalid" />
                <label for="text" class="float-label-text">{{ props.placeholder }}</label>
            </FloatLabel>
            <small v-if="isInvalid" :id="`${keyId}-help`" class="invalid-text">{{ props.invalidText }}</small>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Password from 'primevue/password';

import { useCommonStore } from '@/stores/common';

interface Props {
    modelValue: string,
    placeholder?: string,
    type?: string,  // text(default), password, textarea
    invalid?: boolean,
    validRegexPattern?: string,
    invalidText?: string,
}

const commonStore = useCommonStore();
const key = commonStore.keyGen();

// props
const props = withDefaults(defineProps<Props>(), {
    modelValue: "",
    placeholder: "",
    type: "text",
    invalidText: "입력값을 확인하세요",
});

// emit
const emit = defineEmits(["update:modelValue"]);

// computed
const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    }
});
const keyId = computed(() => `text-${key}`);
const validRegex = computed(() => new RegExp(props.validRegexPattern ?? ""));
const isInvalid = computed(() => {
    if (!props.validRegexPattern) return false;

    if (value.value.match(validRegex.value)) return false;
    else return true;
});
</script>

<style scoped lang="scss">
.p-inputtext {
    min-width: 17.375rem;
}

.float-label-text {
    color: #4b5563;
}

.invalid-text {
    color: red;
}
</style>