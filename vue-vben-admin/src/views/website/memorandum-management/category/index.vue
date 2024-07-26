<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button
          v-auth="'Page.Website.MemorandumManagement.Category..Add'"
          type="primary"
          @click="handleCreate"
          >新增</a-button
        >
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'Page.Website.MemorandumManagement.Category.Edit',
                icon: 'clarity:note-edit-line',
                tooltip: '编辑',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'Page.Website.MemorandumManagement.Category.Delete',
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'bottomRight',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <CreateOrEditModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getPage, del } from '@/api/website/memorandum-category';
  import { PageWrapper } from '@/components/Page';
  import { useModal } from '@/components/Modal';
  import CreateOrEditModal from './CreateOrEditModal.vue';
  import { columns, searchFormSchema } from './category.data';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();

  const [registerModal, { openModal }] = useModal();
  const searchInfo = reactive<Recordable>({});
  const [registerTable, { reload }] = useTable({
    title: '列表',
    api: getPage,
    rowKey: 'id',
    columns,
    formConfig: {
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    handleSearchInfoFn(info) {
      const { createDate, ...params } = info;
      return {
        ...params,
        startDate: createDate ? createDate[0] : undefined,
        endDate: createDate ? createDate[1] : undefined,
      };
    },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
    },
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  async function handleDelete(record: Recordable) {
    await del({
      id: record.id,
    });
    createMessage.success('删除成功');
    reload();
  }

  function handleSuccess({ isUpdate, values }) {
    reload();
  }
</script>
