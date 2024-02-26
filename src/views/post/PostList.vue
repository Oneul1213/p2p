<template>
    <div class="root">
        <div class="container">
            <div class="title-wrapper">
                <p class="title">게시글 목록</p>
                <div class="button-wrapper">
                    <Button label="뒤로가기" @click="movePage('main')" />
                    <Button label="게시글 삭제" @click="onRemoveButtonClick" />
                    <Button label="게시글 작성" @click="movePage('post-write')" />
                </div>
            </div>
            <div class="table-wrapper">
                <DataTable
                    v-model:selection="selectedRows"
                    :value="tableDataRefs"
                    tableStyle="min-width: 50rem"
                    stripedRows
                    paginator
                    :rows="10"
                    selectionMode="multiple"
                    @rowSelect="onRowSelect"
                    @rowDblclick="onRowDblClick"
                >
                    <Column field="title" header="제목"></Column>
                    <Column field="content" header="내용"></Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type {
    DataTableRowSelectEvent,
    DataTableRowDoubleClickEvent
} from 'primevue/datatable';

import { inject, onMounted, ref } from 'vue';

import { useRouter } from 'vue-router';

import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import { usePostStore } from '@/stores/post';
import { storeToRefs } from 'pinia';
import { toastAddKey } from '@/constant/injectionKey';
import type { ToastConfig } from '@/common/type';

const router = useRouter();
const postStore = usePostStore();

const { tableData: tableDataRefs } = storeToRefs(postStore);

const selectedRows = ref<Array<any>>([]);
const selectedRowIndices = ref<Array<number>>([]);

const toastAdd = inject(toastAddKey) as (toastConfig: ToastConfig) => void;

onMounted(() => {
    postStore.requestPostList().then((response) => {
        // TODO : API 연결 후 조건문 삭제?
        if (tableDataRefs.value.length === 0) tableDataRefs.value = response.result.posts;
        console.log("tableData? ", tableDataRefs.value);
    });
})

function movePage(pageNm: string) {
    if (pageNm === "back") {
        router.go(-1);
    } else router.push({ name: pageNm });
}

function onRemoveButtonClick() {
    console.log("selecteRows? ", selectedRows.value);
    console.log("selectedRowIndices? ", selectedRowIndices.value);
    const removedDataCount = selectedRowIndices.value.length;

    tableDataRefs.value = tableDataRefs.value.filter((_, index) => !selectedRowIndices.value.includes(index));
    // TODO : DB 삭제

    let toastConfig: ToastConfig = {
        severity: "success",
        summary: "삭제 성공",
        detail: `${removedDataCount}개의 데이터가 삭제되었습니다.`,
        life: 3000,
    };
    toastAdd(toastConfig);
}

function onRowSelect(selectEvent: DataTableRowSelectEvent) {
    console.log("selectEvent? ", selectEvent);
    selectedRowIndices.value.push(selectEvent.index);
    console.log("selectdRowIndices? ", selectedRowIndices.value);
}

function onRowDblClick(dblClickEvnet: DataTableRowDoubleClickEvent) {
    console.log("dbl click evnet? ", dblClickEvnet);
    router.push({ name: 'post-detail', params: { postId: dblClickEvnet.data.id } });
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
                min-width: 13.97rem !important;
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