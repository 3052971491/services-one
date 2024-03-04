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
          @check="onChecked($event, true)"
        >
        </Tree>
      </tab-pane>
      <tab-pane key="2" tab="接口权限" force-render>
        <Tree
          v-if="apiTreeData.length"
          v-model:checkedKeys="api"
          block-node
          checkable
          checkStrictly
          default-expand-all
          :tree-data="apiTreeData"
          :field-names="{
            key: 'id',
            title: 'name',
          }"
          :height="400"
          @check="onChecked($event, false)"
        >
        </Tree>
      </tab-pane>
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
  import { getPermList, updateRole } from '@/api/demo/system';

  const { createMessage } = useMessage();

  defineOptions({ name: 'PermissionModal' });

  const emit = defineEmits(['success', 'register']);
  const rowId = ref('');
  const activeKey = ref('1');
  const getTitle = computed(() => '权限分配');

  const menu = ref<Key[]>([]);
  const menuTreeData = ref([]);

  const api = ref<Key[]>([]);
  const apiTreeData = ref([]);

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    activeKey.value = '1';
    setModalProps({ confirmLoading: true });
    const { menus = [], apis = [] } = data.record;
    rowId.value = data.record.id;
    // 获取所有的菜单列表
    let menuList = await getAllList();
    let apiList = await getPermList();
    menuList = listToTree(
      menuList,
      {
        id: 'id',
        pid: 'parentId',
      },
    );
    apiList = listToTree(
      apiList,
      {
        id: 'id',
        pid: 'parentId',
      },
    );
    // 初始化数据
    menu.value = menus.map((item) => item.id);
    api.value = apis.map((item) => item.id);
    menuTreeData.value = handleTreeData('menu', menuList, menu.value);
    apiTreeData.value = handleTreeData('api', apiList, api.value);

    setModalProps({ confirmLoading: false });
  });

  function handleTreeData(type: string, treeNodes: TransferProps['dataSource'] = [], targetKeys: Key[] = []) {
    return treeNodes.map(({ children, ...props }) => ({
      ...props,
      disabled: type === 'api', // 只有是接口权限, 且是第一层节点时禁用
      children: handleTreeData('', children ?? [], targetKeys),
    }));
  }

  /**
   * 节点选中回调
   * @param flag 是否是菜单权限
   * @param checkedKeys 选中节点
   */
  const onChecked = (checkedKeys: any, flag: boolean, ): void => {
    if (flag) {
      menu.value = checkedKeys.checked as  Key[];
    } else {
      api.value = checkedKeys.checked as  Key[];
    }
  };

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const params = {
        id: rowId.value,
        menus: menu.value,
        apis: api.value,
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
