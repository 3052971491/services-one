<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增菜单 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
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
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { nextTick } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { useDrawer } from '@/components/Drawer';
  import MenuDrawer from './MenuDrawer.vue';
  import { columns, searchFormSchema } from './menu.data';
  import { deleteMenu, getAllList } from '@/api/admin/menu';
  import { listToTree } from '@/utils/helper/treeHelper';
  import { usePermission } from '@/hooks/web/usePermission';
  import { MenuListItem } from '@/api/admin/model/menu';

  const { refreshMenu } = usePermission();

  defineOptions({ name: 'MenuManagement' });

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { expandAll }] = useTable({
    title: '菜单列表',
    api: getAllList,
    columns,
    formConfig: {
      schemas: searchFormSchema,
    },
    isTreeTable: true,
    pagination: false,
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
    afterFetch: (data: MenuListItem[]) => {
      data = data.sort((a, b) => {
        return a.orderNum - b.orderNum;
      });
      const result = listToTree(data, {
        pid: 'parentId',
      });
      return result;
    },
  });

  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  async function handleDelete(record: Recordable) {
    console.log(record);
    await deleteMenu({ id: record.id });
    refreshMenu();
  }

  function handleSuccess() {
    refreshMenu();
  }

  function onFetchSuccess() {
    // 演示默认展开所有表项
    nextTick(expandAll);
  }
</script>
