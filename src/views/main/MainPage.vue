<template>
    <div class="root">
        <div class="container">
            <div class="title-wrapper">
                <p class="title">게시판</p>
            </div>
            <div class="button-wrapper">
                <div class="login" v-if="isLogin">
                    <p class="login-user">{{ `${userName}님, 안녕하세요` }}</p>
                    <Button label="게시글 목록" />
                </div>
                <div class="login" v-if="!isLogin">
                    <Button label="로그인" @click="movePage('auth-login')" />
                    <Button label="회원가입" @click="movePage('auth-signup')" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Button from 'primevue/button';


const router = useRouter();

const isLogin = ref(false);
const userName = ref("홍길동");

function movePage(pageNm: string) {
    router.push({ name: pageNm });
}
</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 13.375rem;
    .title-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .button-wrapper {
            .login {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 2.4375rem;
            }
        }
}
</style>