<template>
    <div class="root">
        <div class="container">
            <div class="title-wrapper">
                <p class="title">게시글 작성</p>
                <div class="button-wrapper">
                    <Button label="뒤로가기" @click="movePage('back')" />
                    <Button label="저장하기" @click="movePage('post-list')" />
                </div>
            </div>
            <div class="content-wrapper">
                <div class="data-wrapper">
                    <TextBox v-model="valueObject.title.value" placeholder="제목을 입력해주세요" />
                    <TextBox v-model="valueObject.content.value" placeholder="내용을 입력해주세요" type="textarea" />
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

interface Data {
    title: string,
    content: string,
}

const router = useRouter();

const valueObject = {
    title: ref(""),
    content: ref(""),
}

function movePage(pageNm: string) {
    if (pageNm === "back") {
        router.go(-1);
    }
    router.push({ name: pageNm });
}
</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.5625rem;
    .title-wrapper {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        :deep(p.title) {
            margin: 0;
        }
        .button-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1.045rem;
            :deep(.p-button) {
                min-width: 21.4776rem !important;
            }
        }
    }
    .content-wrapper {
        width: 100%;
        padding: 1rem;
        height: 46rem;
        border: 1px solid #D9D9D9;
        p.data-title {
            margin: 0;
            font-size: 2.5rem;;
        }
        .data-wrapper {
            display: flex;
            flex-direction: column;
            gap: 1.7rem;
            :deep(.p-inputtextarea) {
                min-width: 114rem;
                min-height: 38rem;
            }
        }
    }
}
</style>