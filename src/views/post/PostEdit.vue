<template>
    <div class="root">
        <div class="container">
            <div class="title-wrapper">
                <p class="title">게시글 작성</p>
                <div class="button-wrapper">
                    <Button label="뒤로가기" @click="movePage('back')" />
                    <Button label="저장하기" @click="onPostSaveButtonClick" />
                </div>
            </div>
            <div class="content-wrapper">
                <div class="data-wrapper">
                    <TextBox
                        v-model="valueObject.title.value"
                        placeholder="제목을 입력해주세요"
                        :valid-regex-pattern="titleValidation.regex"
                        :invalid-text="titleValidation.invalidText"
                    />
                    <TextBox
                        v-model="valueObject.content.value"
                        placeholder="내용을 입력해주세요"
                        type="textarea"
                        :valid-regex-pattern="contentValidation.regex"
                        :invalid-text="contentValidation.invalidText"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Post, ToastConfig } from '@/common/type';

import { inject, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Button from 'primevue/button';

import TextBox from '@/components/TextBox.vue';
import { usePostStore } from '@/stores/post';
import { toastAddKey } from '@/constant/injectionKey';
import { storeToRefs } from 'pinia';

const router = useRouter();
const route = useRoute();
const postStore  = usePostStore();

const { tableData: tableDataRefs } = storeToRefs(postStore);

const toastAdd = inject(toastAddKey) as (toastConfig: ToastConfig) => void;

const valueObject = {
    title: ref(""),
    content: ref(""),

    postId: -1,
    authorId: -1,
}

// TODO : 최대 글자수 제한 다시 확인
const titleValidation = {
    regex: "[\\w가-힣ㄱ-ㅣ]{2,30}",
    invalidText: "제목은 2~30자여야 합니다."
}

const contentValidation = {
    regex: "[\\w가-힣ㄱ-ㅣ]{2,2000}",
    invalidText: "내용은 2~2000자여야 합니다."
}

onMounted(() => {
    const postId = route.params.postId;
    console.log("postId? ", postId);
    if (postId !== null || postId !== undefined) {
        const data = tableDataRefs.value.find((data: Post) => data.id === Number(postId));
        console.log("data? ", data);
        valueObject.postId = data?.id as number;
        valueObject.authorId = data?.authorId as number;
        valueObject.title.value = data?.title as string;
        valueObject.content.value = data?.content as string;
    }
})

function movePage(pageNm: string) {
    if (pageNm === "back") {
        router.go(-1);
    }
    router.push({ name: pageNm });
}

function onPostSaveButtonClick() {
    let params = {
        id: valueObject.postId,
        authorId: valueObject.authorId,
        title: valueObject.title.value,
        content: valueObject.content.value,
    }
    postStore.requestSavePost(params).then((response) => {
        console.log("성공: ", response);
        let toastConfig: ToastConfig = {
            severity: "success",
            summary: "저장 성공",
            detail: "게시글이 저장되었습니다.",
            life: 3000,
        };
        toastAdd(toastConfig);
        // id가 일치하는 것이 이미 있으면 해당 값 수정, 없으면 생성임
        console.log("tableData? ", tableDataRefs.value, "parmas.id? ", params.id);
        const index = tableDataRefs.value.findIndex((data) => data.id === params.id);
        console.log("index? ", index);
        if (index !== -1) {
            // 수정
            console.log("게시글 수정됨");
            const updatedPost = response.result;
            tableDataRefs.value[index] = updatedPost;
        } else {
            // 생성
            console.log("게시글 생성됨");
            const createdPost = response.result;
            tableDataRefs.value.push(createdPost);
        }
        // 게시글 목록으로 이동
        movePage('post-list');
    }).catch(({ response }) => {
        console.log("실패: ", response.data);

        let toastConfig: ToastConfig = {
            severity: "error",
            summary: "저장 실패",
            detail: response.data.message,
            life: 3000,
        };
        toastAdd(toastConfig);
    });
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
            overflow: scroll;
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