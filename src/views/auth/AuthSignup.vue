<template>
    <div class="root">
        <div class="container">
            <div class="title-wrapper">
                <p class="title">회원가입</p>
            </div>
            <div class="content-wrapper">
                <div class="text-wrapper">
                    <TextBox v-model="valueObject.nickname.value" placeholder="닉네임을 입력하세요" />
                    <TextBox v-model="valueObject.id.value" placeholder="아이디를 입력하세요" />
                    <TextBox v-model="valueObject.password.value" placeholder="비밀번호를 입력하세요" type="password" />
                </div>
                <div class="button-wrapper">
                    <Button label="뒤로가기" @click="movePage('back')" />
                    <Button label="회원가입" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Button from 'primevue/button';

import TextBox from '@/components/TextBox.vue';

const router = useRouter();

const valueObject = {
    nickname: ref<string>(""),
    id: ref(""),
    password: ref(""),
}

function movePage(pageNm: string) {
    if (pageNm === "back") {
        router.go(-1);
    }
    router.push({ name: pageNm });
}
</script>

<style scoped lang="scss">
:deep(.p-inputtext) {
    width: 44rem;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6.0625rem;
    .title-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .content-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2.4375rem;
        .text-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 2.4375rem;
        }

        .button-wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1.045rem;

            :deep(.p-button) {
                min-width: 21.4775rem !important;
            }
        }
    }
}
</style>