<template>
    <div class="root">
        <div class="container">
            <div class="title-wrapper">
                <p class="title">게시글 상세</p>
                <div class="button-wrapper">
                    <Button label="뒤로가기" @click="movePage('back')" />
                    <Button label="게시글 수정" @click="movePage('post-update')" />
                </div>
            </div>
            <div class="content-wrapper">
                <div class="data-wrapper">
                    <p class="data-title">{{ data?.title }}</p>
                    <div class="inner-content-wrapper border">
                        <p>{{ data?.content }}</p>
                    </div>
                </div>
                <div class="comment-wrapper">
                    <p class="data-title">댓글</p>
                    <div class="inner-comment-wrapper border">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

import Button from 'primevue/button';

import { usePostStore } from '@/stores/post';
import { onMounted, ref } from 'vue';

interface Data {
    title: string,
    content: string,
}

const router = useRouter();
const route = useRoute();

const postStore = usePostStore();

const data = ref<Data>();

onMounted(() => {
    const index: number = Number(route.params.index);
    data.value = postStore.tableData[index];
    console.log(data.value);
})

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
        .border {
            border: 1px solid black;
        }
        .data-wrapper {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            .inner-content-wrapper {
                padding: 1rem;
                min-height: 20.4375rem;
                p {
                    margin: 0;
                }
            }
        }
        .comment-wrapper {
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            .inner-comment-wrapper {
                min-height: 14rem;
            }
        }
    }
}
</style>