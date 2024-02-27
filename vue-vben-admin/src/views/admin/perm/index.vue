<template>
  <div class="w-full h-full">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑',
                ifShow: record.isSystem !== 0,
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                ifShow: record.isSystem !== 0,
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <PermModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { deleteRole, getPermList } from '@/api/demo/system';

  import { useModal } from '@/components/Modal';
  import PermModal from './PermModal.vue';

  import { columns, searchFormSchema } from './perm.data';
  import { useMessage } from '@/hooks/web/useMessage';
  

  defineOptions({ name: 'PermManagement' });

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '接口列表',
    api: getPermList,
    columns,
    formConfig: {
      schemas: searchFormSchema,
    },
    pagination: false,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
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
      fixed: 'right',
    },
  });

  const { createMessage } = useMessage()

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
    await deleteRole(record.id)
    createMessage.success('删除成功')
    reload();
  }

  function handleSuccess() {
    reload();
  }
</script>
