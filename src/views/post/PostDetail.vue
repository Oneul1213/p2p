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
                        <OrderList
                            v-model="commentList"
                            listStyle="height:auto"
                            dataKey="id"
                            :stripedRows="true"
                            :selection="selectedCommentList"
                            @selection-change="onCommentSeletionChange"
                        >
                            <template #item="slotProps">
                                <div class="comment-item-wrapper">
                                    <!-- TODO : 작성자 이름으로 수정 -->
                                    <span class="commnet-author">{{ slotProps.item.authorId }}</span>
                                    <span ckass="comment-content">{{ slotProps.item.content }}</span>
                                </div>
                            </template>
                        </OrderList>
                    </div>
                    <TextBox
                        v-model="commentValue"
                        placeholder="댓글을 입력해주세요"
                        type="textarea"
                        :validRegexPattern="commentValidation.regex"
                        :invalidText="commentValidation.invalidText"
                    />
                    <div class="comment-button-wrapper">
                        <Button label="댓글 삭제" @click="onCommentDeleteButtonClick" />
                        <Button label="댓글 입력" @click="onCommentInputButtonClick" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { OrderListSelectionChangeEvent } from 'primevue/orderlist'
import type { Comment, Post, CommentRequestBody, ToastConfig } from '@/common/type';

import { useRouter, useRoute } from 'vue-router';
import { inject, onMounted, ref } from 'vue';

import Button from 'primevue/button';
import OrderList from 'primevue/orderlist';

import TextBox from '@/components/TextBox.vue';
import { usePostStore } from '@/stores/post';
import { useUserStore } from '@/stores/user';
import { useCommentStore } from '@/stores/comment';
import { toastAddKey } from '@/constant/injectionKey';

const router = useRouter();
const route = useRoute();

const postStore = usePostStore();
const userStore = useUserStore();
const commentStore = useCommentStore();

const toastAdd = inject(toastAddKey) as (toastConfig: ToastConfig) => void;

const post = ref<Post>();
const commentList = ref<Array<Comment>>();
const commentValue = ref<string>("");
const postId = ref<number>(-1);
const selectedCommentList = ref<Array<Comment>>([]);

const commentValidation = {
    regex: "[\\wㄱ-ㅣ가-힣]{2,200}",
    invalidText: "내용은 2~20자여야 합니다."
}

onMounted(() => {
    try {
        postId.value = Number(route.params.postId);
        const data = postStore.tableData.find((data) => data.id === postId.value);
        console.log("data? ", data);

        // TODO : 가져온 data를 이용해서 게시글 정보 가져오기 후 댓글 설정
        postStore.requestPostDetail({ postId: data?.id }).then((response) => {
            post.value = response.result;
            console.log("post? ", post.value);
            commentList.value = post.value?.comments;
        });
    } catch (e: any) {
        console.log("호출 에러: ", e);
        movePage("post-list");
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

function onCommentSeletionChange(e: OrderListSelectionChangeEvent) {
    console.log("selection change? ", e);
    selectedCommentList.value = e.value;
}

function onCommentDeleteButtonClick() {
    console.log("선택? ", selectedCommentList.value);
    if (selectedCommentList.value.some((comment) => comment.authorId !== userStore.userInfo?.id)) {
        let toastConfig: ToastConfig = {
            severity: "error",
            summary: "삭제 실패",
            detail: "삭제할 권한이 없는 댓글이 있습니다.",
            life: 3000,
        };
        toastAdd(toastConfig);
    } else {
        for (let selectedComment of selectedCommentList.value) {
            const index = commentList.value?.findIndex((comment) =>  comment.id === selectedComment.id) as number;
            if (index != -1) {
                commentList.value?.splice(index, 1);
                // Api 호출
                let params = { commentId: selectedComment.id }
                commentStore.requestDeleteComment(params);
            }
        }
    }
    // 선택 초기화
    selectedCommentList.value.splice(0, selectedCommentList.value.length);
    console.log("비움? ", selectedCommentList.value);
}

function onCommentInputButtonClick() {
    if (commentValue.value !== "") {
        console.log("loginUserNickname? ", userStore.userInfo?.nickname);
        let params: CommentRequestBody = {
            authorId: userStore.userInfo?.id as Number,
            postId: postId.value,
            content: commentValue.value,
        }
        // comment 생성 api 호출 후 반환 값 commentList에 추가
        commentStore.requestCreateComment(params).then((response) => {
            console.log("data? ", response);
            commentList.value?.push(response.result);
            commentValue.value = "";
        })
    }
}
</script>

<style scoped lang="scss">
:deep(.p-button) {
    min-width: 21.4776rem !important;
}
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
        }
    }
    .content-wrapper {
        width: 100%;
        padding: 1rem;
        height: 53rem;
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
                min-height: 17.4375rem;
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
            :deep(.textbox-component) {
                margin-top: 1rem;
            }
            :deep(.p-inputtextarea) {
                width: 100%;
            }
            .comment-button-wrapper {
                display: flex;
                justify-content: flex-end;
                gap: 1rem;
            }
        }
    }
}
</style>