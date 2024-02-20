<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <Tabs v-model:activeKey="activeKey">
      <tab-pane key="1" tab="页面权限">
        <Transfer
          v-model:target-keys="menu"
          class="tree-transfer"
          :data-source="menuDataSource"
          :render="(item) => item.title"
          :show-select-all="true"
          show-search
          @change="onChangeTransfer"
        >
          <template #children="{ direction, selectedKeys, onItemSelect }">
            <Tree
              v-if="direction === 'left'"
              block-node
              checkable
              check-strictly
              default-expand-all
              :checked-keys="[...selectedKeys, ...menu]"
              :tree-data="menuTreeData"
              @check="
                (_, props) => {
                  onChecked(props, [...selectedKeys, ...menu], onItemSelect);
                }
              "
              @select="
                (_, props) => {
                  onChecked(props, [...selectedKeys, ...menu], onItemSelect);
                }
              "
            />
          </template>
        </Transfer>
      </tab-pane>
      <tab-pane key="2" tab="接口权限" force-render></tab-pane>
    </Tabs>
  </BasicModal>
</template>
<script lang="ts" setup>
  import type { TransferProps } from 'ant-design-vue';
  import { Tree, Transfer, TabPane, Tabs } from 'ant-design-vue';
  import { ref, computed } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';
  import { getAllList } from '@/api/admin/menu';
  import { listToTree } from '@/utils/helper/treeHelper';
  const { createMessage } = useMessage();

  defineOptions({ name: 'MenuPermissionModal' });

  const emit = defineEmits(['success', 'register']);
  const rowId = ref('');
  const activeKey = ref('1');
  const getTitle = computed(() => '权限分配');

  const menu = ref<string[]>([]);
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    const { permission = [] } = data.record;
    rowId.value = data.record.id;
    // 获取所有的菜单列表
    let menuList = await getAllList();
    menuList = listToTree(
      menuList.map((i) => {
        let obj = {
          key: i.id,
          title: i.name,
          ...i,
        };
        return obj;
      }),
      {
        id: 'key',
        pid: 'parentId',
      },
    );
    // 转成树形结构
    tData.value = menuList;
    flatten(JSON.parse(JSON.stringify(tData.value)));
    // 初始化数据
    menu.value = permission;
    menuTreeData.value = handleTreeData(tData.value, permission);
  });
  

  const tData = ref<NonNullable<TransferProps['dataSource']>>([]);
  const transferDataSource: NonNullable<TransferProps['dataSource']> = [];
  function flatten(list: TransferProps['dataSource'] = []) {
    list.forEach((item) => {
      transferDataSource.push(item);
      flatten(item.children);
    });
  }
  function isChecked(selectedKeys: (string | number)[], eventKey: string | number) {
    return selectedKeys.indexOf(eventKey) !== -1;
  }
  function handleTreeData(treeNodes: TransferProps['dataSource'] = [], targetKeys: string[] = []) {
    return treeNodes.map(({ children, ...props }) => ({
      ...props,
      disabled: targetKeys.includes(props.key as string),
      children: handleTreeData(children ?? [], targetKeys),
    }));
  }
  const menuDataSource = ref(transferDataSource);
  const menuTreeData = ref(handleTreeData(tData.value, []));
  const onChecked = (e: any, checkedKeys: string[], onItemSelect: (n: any, c: boolean) => void) => {
    const { eventKey } = e.node;
    onItemSelect(eventKey, !isChecked(checkedKeys, eventKey as string | number));
  };
  async function onChangeTransfer(targetKeys: string[]) {
    menuTreeData.value = handleTreeData(tData.value, targetKeys);
  }

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      // 调用保存接口
      createMessage.success('更新成功');
      closeModal();
      emit('success', {});
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
