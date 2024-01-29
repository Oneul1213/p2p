<template>
    <div class="root">
        <div class="container">
            <div class="title-wrapper">
                <p class="title">게시글 목록</p>
                <div class="button-wrapper">
                    <Button label="뒤로가기" @click="movePage('back')" />
                    <Button label="게시글 작성" @click="movePage('post-write')" />
                </div>
            </div>
            <div class="table-wrapper">
                <DataTable :value="postStore.tableData" tableStyle="min-width: 50rem" stripedRows paginator :rows="10" selectionMode="single" @rowSelect="onRowSelect">
                    <Column field="title" header="제목" style="min-width: 27.328125rem"></Column>
                    <Column field="content" header="내용" style="min-width: 81.984375rem"></Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type DataTableRowSelectEvent } from 'primevue/datatable';

import { onMounted } from 'vue';

import { useRouter } from 'vue-router';

import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import { usePostStore } from '@/stores/post';

const router = useRouter();
const postStore = usePostStore();

onMounted(() => {
    postStore.requestTableData().then((response) => {
        postStore.tableData = response.result.posts;
        console.log("tableData? ", postStore.tableData);
    });
})

function movePage(pageNm: string) {
    if (pageNm === "back") {
        router.go(-1);
    } else router.push({ name: pageNm });
}

function onRowSelect(selectEvent: DataTableRowSelectEvent) {
    console.log(selectEvent);
    router.push({ name: 'post-detail', params: { index: selectEvent.index } });
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
    .table-wrapper {
        width: 100%;
        padding: 1rem;
        height: 46rem;
        border: 1px solid #D9D9D9;
    }
}
</style>