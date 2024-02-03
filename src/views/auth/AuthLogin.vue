<template>
    <div class="root">
        <div class="container">
            <div class="title-wrapper">
                <p class="title">로그인</p>
            </div>
            <div class="content-wrapper">
                <div class="text-wrapper">
                    <TextBox v-model="valueObject.username.value" placeholder="아이디를 입력하세요" />
                    <TextBox v-model="valueObject.password.value" placeholder="비밀번호를 입력하세요" type="password" />
                </div>
                <div class="button-wrapper">
                    <Button label="뒤로가기" @click="movePage('back')" />
                    <Button label="로그인" @click="onLoginButtonClick" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { LoginRequestBody, LoginOkResponseResult, ToastConfig } from '@/common/type';

import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

import Button from 'primevue/button';

import TextBox from '@/components/TextBox.vue';
import ApiServcie from "@/common/ApiService";
import { useToastStore } from '@/stores/toast';  

const router = useRouter();
const toastStore = useToastStore();

const valueObject = {
    username: ref(""),
    password: ref(""),
}

const toastAdd = inject(toastStore.toastAddKey) as (toastConfig: ToastConfig) => void;

function movePage(pageNm: string) {
    if (pageNm === "back") {
        router.go(-1);
    }
    router.push({ name: pageNm });
}

function onLoginButtonClick() {
    console.log("id: ", valueObject.username.value, ", password: ", valueObject.password.value);

    requestLogin(valueObject.username.value, valueObject.password.value).then((data)=> {
        console.log("로그인 정보: ", data);
        const loginResult: LoginOkResponseResult = data.result;
        localStorage.setItem("login_user", loginResult.nickname);
        localStorage.setItem("access_token", loginResult.accessToken);
        router.push({ name: "main" });
    }).catch(({ response }) => {
        console.log("에러 정보: ", response);
        let toastConfig: ToastConfig = {
            severity: "error",
            summary: "로그인 실패",
            detail: "아이디 또는 비밀번호를 확인하세요.",
            life: 3000,
        };
        if (response.statusText === "NOT_MATCH_PASSWORD") {
            toastConfig = {
                ... toastConfig,
                detail: "비밀번호가 일치하지 않습니다.",
            }
        }
        toastAdd(toastConfig);
    });
}

async function requestLogin(username: string, password: string) {
    const loginParam: LoginRequestBody = {
        username: username,
        password: password,
    }
    return await ApiServcie.request("post", "/v1/auth/login", loginParam).then(({ data }) => data);
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
    gap: 13.6875rem;
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