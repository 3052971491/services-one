<template>
  <div class="w-full h-full">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑角色信息',
                ifShow: record.isSystem !== 0,
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'icon-park-outline:permissions',
                tooltip: '权限分配',
                ifShow: record.isSystem !== 0,
                onClick: handlePermission.bind(null, record),
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
    <RoleModal @register="registerModal" @success="handleSuccess" />
    <MenuPermissionModal :width="900" @register="registerPermissionModal" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { deleteRole, getRoleListByPage } from '@/api/demo/system';

  import { useModal } from '@/components/Modal';
  import RoleModal from './RoleModal.vue';
  import MenuPermissionModal from './MenuPermissionModal.vue';

  import { columns, searchFormSchema } from './role.data';
  import { useMessage } from '@/hooks/web/useMessage';
  

  defineOptions({ name: 'RoleManagement' });

  const [registerModal, { openModal }] = useModal();
  const [registerPermissionModal, permissionModal] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '角色列表',
    api: getRoleListByPage,
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
      // slots: { customRender: 'action' },
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

  function handlePermission(record: Recordable) {
    permissionModal.openModal(true, {
      record,
    });
  }

  function handleSuccess() {
    reload();
  }
</script>
