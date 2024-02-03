<template>
  <div class="w-full h-full">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增文件 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'icon-park-outline:copy',
                onClick: handleCopy.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <FileModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getFileList } from '@/api/system/file';

  import { useModal } from '@/components/Modal';
  import FileModal from './FileModal.vue';

  import { columns, searchFormSchema } from './file.data';
  import { useMessage } from '@/hooks/web/useMessage';
import { copyText } from '@/utils/copyTextToClipboard';

  defineOptions({ name: 'RoleManagement' });

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '文件列表',
    api: getFileList,
    columns,
    formConfig: {
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    handleSearchInfoFn(info) {
      const { createDate, ...params } = info;
      return {
        ...params,
        startDay: createDate ? createDate[0] : undefined,
        endDay: createDate ? createDate[1] : undefined,
      };
    },
    actionColumn: {
      width: 50,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
  });

  const { createMessage } = useMessage();

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  async function handleCopy(record: Recordable) {
    if (!record.url) {
      createMessage.warning('请输入要拷贝的内容！');
      return;
    }
    copyText(record.url);
  }

  function handleSuccess() {
    reload();
  }
</script>
