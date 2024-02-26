<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <Tabs v-model:activeKey="activeKey">
      <tab-pane key="1" tab="页面权限">
        <Tree
          v-if="menuTreeData.length"
          v-model:checkedKeys="menu"
          block-node
          checkable
          check-strictly
          default-expand-all
          :tree-data="menuTreeData"
          :field-names="{
            key: 'id',
            title: 'name',
          }"
          :height="400"
          @check="onChecked"
        >
        </Tree>
      </tab-pane>
      <tab-pane key="2" tab="接口权限" force-render></tab-pane>
    </Tabs>
  </BasicModal>
</template>
<script lang="ts" setup>
  import type { TransferProps } from 'ant-design-vue';
  import { Key } from '@/components/Menu/src/types';
  import { Tree, TabPane, Tabs } from 'ant-design-vue';
  import { ref, computed } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';
  import { getAllList } from '@/api/admin/menu';
  import { listToTree } from '@/utils/helper/treeHelper';
  import { updateRole } from '@/api/demo/system';

  const { createMessage } = useMessage();

  defineOptions({ name: 'MenuPermissionModal' });

  const emit = defineEmits(['success', 'register']);
  const rowId = ref('');
  const activeKey = ref('1');
  const getTitle = computed(() => '权限分配');

  const menu = ref<Key[]>([]);
  const menuTreeData = ref([]);

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: true });
    const { menus = [] } = data.record;
    rowId.value = data.record.id;
    // 获取所有的菜单列表
    let menuList = await getAllList();
    menuList = listToTree(
      menuList,
      {
        id: 'id',
        pid: 'parentId',
      },
    );
    // 初始化数据
    menu.value = menus.map((item) => item.id);
    menuTreeData.value = handleTreeData(menuList, menu.value);
    setModalProps({ confirmLoading: false });
  });
  function handleTreeData(treeNodes: TransferProps['dataSource'] = [], targetKeys: Key[] = []) {
    return treeNodes.map(({ children, ...props }) => ({
      ...props,
      // disabled: targetKeys.includes(props.key as string),
      children: handleTreeData(children ?? [], targetKeys),
    }));
  }

  const onChecked = (checkedKeys: any): void => {
    menu.value = checkedKeys.checked as  Key[];
  };

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const params = {
        id: rowId.value,
        menus: menu.value,
        apis: [],
      };
      await updateRole(params);
      // 调用保存接口
      createMessage.success('更新成功');
      closeModal();
      emit('success', {});
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
