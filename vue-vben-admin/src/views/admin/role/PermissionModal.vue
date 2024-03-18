<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <Tabs v-model:activeKey="activeKey">
      <tab-pane key="1" tab="基础信息">
        <BasicForm @register="registerForm" />
      </tab-pane>
      <tab-pane key="2" tab="页面权限">
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
        />
      </tab-pane>
      <tab-pane key="3" tab="接口权限" force-render>
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
        />
      </tab-pane>
    </Tabs>
  </BasicModal>
</template>
<script lang="ts" setup>
  import type { TransferProps } from 'ant-design-vue';
  import { Key } from '@/components/Menu/src/types';
  import { Tree, TabPane, Tabs } from 'ant-design-vue';
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';
  import { getAllList } from '@/api/admin/menu';
  import { listToTree } from '@/utils/helper/treeHelper';
  import { createRole, getPermList, updateRole } from '@/api/demo/system';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './role.data';

  const { createMessage } = useMessage();

  defineOptions({ name: 'PermissionModal' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');
  const activeKey = ref('1');
  const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

  const menu = ref<Key[]>([]);
  const menuTreeData = ref([]);

  const api = ref<Key[]>([]);
  const apiTreeData = ref([]);

  const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    activeKey.value = '1';
    isUpdate.value = !!data?.isUpdate;
    setModalProps({ loading: true });

    const { menus = [], apis = [] } = data.record;
    rowId.value = data.record.id;
    // 获取所有的菜单列表
    let menuList = await getAllList({ hasBtn: 1 });
    let apiList = await getPermList();
    menuList = listToTree(menuList, {
      id: 'id',
      pid: 'parentId',
    });
    apiList = listToTree(apiList, {
      id: 'id',
      pid: 'parentId',
    });
    // 初始化数据
    menu.value = menus.map((item) => item.id);
    api.value = apis.map((item) => item.id);
    menuTreeData.value = handleTreeData('menu', menuList, menu.value);
    apiTreeData.value = handleTreeData('api', apiList, api.value);

    if (unref(isUpdate)) {
      rowId.value = data.record.id;
      setFieldsValue({
        ...data.record,
      });
    }

    setModalProps({ loading: false });
  });

  function handleTreeData(
    type: string,
    treeNodes: TransferProps['dataSource'] = [],
    targetKeys: Key[] = [],
  ) {
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
  const onChecked = (checkedKeys: any, flag: boolean): void => {
    if (flag) {
      menu.value = checkedKeys.checked as Key[];
    } else {
      api.value = checkedKeys.checked as Key[];
    }
  };

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (unref(isUpdate)) {
        await updateRole({ id: rowId.value, ...values, menus: menu.value, apis: api.value });
        createMessage.success('更新成功');
      } else {
        await createRole({
          menus: menu.value,
          apis: api.value,
          ...values,
        });
        createMessage.success('新增成功');
      }
      closeModal();
      emit('success', {});
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
