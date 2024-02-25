<template>
    <div class="root">
        <div class="container">
            <div class="title-wrapper">
                <p class="title">게시글 상세</p>
                <div class="button-wrapper">
                    <Button label="뒤로가기" @click="movePage('back')" />
                    <Button label="게시글 수정" @click="movePage('post-update', post?.id)" />
                </div>
            </div>
            <div class="content-wrapper">
                <div class="data-wrapper">
                    <p class="data-title">{{ post?.title }}</p>
                    <div class="inner-content-wrapper border">
                        <p>{{ post?.content }}</p>
                    </div>
                </div>
                <div class="comment-wrapper">
                    <p class="data-title">댓글</p>
                    <div class="inner-comment-wrapper border">
                        <OrderList v-model="commentList" listStyle="height:auto" dataKey="id" :stripedRows="true">
                            <template #item="slotProps">
                                <div class="comment-item-wrapper">
                                    <!-- TODO : 작성자 이름으로 수정 -->
                                    <span class="commnet-author">{{ slotProps.item.authorId }}</span>
                                    <span ckass="comment-content">{{ slotProps.item.content }}</span>
                                </div>
                            </template>
                        </OrderList>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Comment, Post } from '@/common/type';
import { useRouter, useRoute } from 'vue-router';

import Button from 'primevue/button';
import OrderList from 'primevue/orderlist';

import { usePostStore } from '@/stores/post';
import { onMounted, ref } from 'vue';

const router = useRouter();
const route = useRoute();

const postStore = usePostStore();

const post = ref<Post>();
const commentList = ref<Array<Comment>>();

onMounted(() => {
    try {
        const index: number = Number(route.params.index);
        const data = postStore.tableData[index];
        console.log("data? ", data);

        // TODO : 가져온 data를 이용해서 게시글 정보 가져오기 후 댓글 설정
        postStore.requestPostDetail({ postId: data.id }).then((response) => {
            post.value = response.result;
            console.log("post? ", post.value);
            commentList.value = post.value?.comments;
        });
    } catch (e: any) {
        console.log("호출 에러: ", e);
        movePage("post-list")
    }
})

function movePage(pageNm: string, params?: any) {
    if (pageNm === "back") {
        router.go(-1);
    }
    if (params !== undefined) {
        router.push({ name: pageNm, params: { postId: params } });
    } else {
        router.push({ name: pageNm });
    }
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
                max-height: 14rem;
                overflow: scroll;
                :deep(.p-orderlist-controls) {
                    display: none;
                }
                .comment-item-wrapper {
                    display: flex;
                    flex-direction: column;
                }
            }
        }
    }
}
</style>