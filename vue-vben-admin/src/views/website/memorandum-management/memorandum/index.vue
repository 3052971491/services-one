<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button
          v-auth="'Page.Website.MemorandumManagement.Memorandum..Add'"
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
                auth: 'Page.Website.MemorandumManagement.Memorandum.Preview',
                icon: 'icon-park-outline:preview-open',
                onClick: handlePreview.bind(null, record),
              },
              {
                ifShow: record.stickyPost !== StatusValue.YES,
                auth: 'Page.Website.MemorandumManagement.Memorandum.StickyPost',
                icon: 'icon-park-outline:list-top',
                tooltip: '置顶',
                onClick: handleStickyPost.bind(null, record),
              },
              {
                auth: 'Page.Website.MemorandumManagement.Memorandum.Edit',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'Page.Website.MemorandumManagement.Memorandum.Delete',
                icon: 'ant-design:delete-outlined',
                color: 'error',
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
    <CreateOrEditModal
      @register="registerModal"
      @success="handleSuccess"
      :defaultFullscreen="true"
      :canFullscreen="false"
    />
    <PreviewModal
      @register="registerPreviewModal"
      :defaultFullscreen="true"
      :canFullscreen="false"
      :showOkBtn="false"
    />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getPage, del, setStickPost } from '@/api/website/memorandum';
  import { PageWrapper } from '@/components/Page';
  import { useModal } from '@/components/Modal';
  import CreateOrEditModal from './CreateOrEditModal.vue';
  import PreviewModal from './PreviewModal.vue';
  import { columns, searchFormSchema } from './memorandum.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { StatusValue } from '@/enums/commonEnum';

  const { createMessage } = useMessage();

  const [registerModal, { openModal }] = useModal();
  const [registerPreviewModal, { openModal: openPreviewModal }] = useModal();
  const searchInfo = reactive<Recordable>({});
  const [registerTable, { reload, setLoading }] = useTable({
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
      width: 180,
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

  function handleSuccess() {
    reload();
  }

  function handleStickyPost(record: Recordable) {
    setLoading(true);
    setStickPost({
      id: record.id,
      stickyPost: StatusValue.YES,
    })
      .then(() => {
        createMessage.success(`操作成功`);
      })
      .finally(() => {
        reload();
        setLoading(false);
      });
  }
  function handlePreview(record: Recordable) {
    openPreviewModal(true, {
      record,
    });
  }
</script>
