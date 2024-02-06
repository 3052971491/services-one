<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #permission="{ model, field }">
        <Transfer
          v-model:target-keys="model[field]"
          class="tree-transfer"
          :data-source="dataSource"
          :render="(item) => item.title"
          :show-select-all="false"
          @change="onChangeTransfer"
        >
          <template #children="{ direction, selectedKeys, onItemSelect }">
            <Tree
              v-if="direction === 'left'"
              block-node
              checkable
              check-strictly
              default-expand-all
              :checked-keys="[...selectedKeys, ...model[field]]"
              :tree-data="treeData"
              @check="
                (_, props) => {
                  onChecked(props, [...selectedKeys, ...model[field]], onItemSelect);
                }
              "
              @select="
                (_, props) => {
                  onChecked(props, [...selectedKeys, ...model[field]], onItemSelect);
                }
              "
            />
          </template>
        </Transfer>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import type { TransferProps } from 'ant-design-vue';
  import { Tree, Transfer } from 'ant-design-vue';
  import { ref, computed } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { permissionFormSchema } from './role.data';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();

  defineOptions({ name: 'MenuPermissionModal' });

  const emit = defineEmits(['success', 'register']);
  const rowId = ref('');
  const [registerForm, { validate, setFieldsValue }] = useForm({
    name: 'permission-form-modal',
    baseColProps: { span: 24 },
    schemas: permissionFormSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    const { permission = [] } = data.record;
    rowId.value = data.record.id;

    // 获取所有的菜单列表

    // 转成树形结构
    tData.value = [];

    // 初始化数据
    setFieldsValue({
      permission,
    });
    treeData.value = handleTreeData(tData.value, permission);
  });

  const getTitle = computed(() => '权限分配');

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // 调用保存接口
      createMessage.success('更新成功');
      closeModal();
      emit('success', {});
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  const tData = ref<NonNullable<TransferProps['dataSource']>>([]);

  const transferDataSource: NonNullable<TransferProps['dataSource']> = [];
  function flatten(list: TransferProps['dataSource'] = []) {
    list.forEach((item) => {
      transferDataSource.push(item);
      flatten(item.children);
    });
  }
  flatten(JSON.parse(JSON.stringify(tData.value)));
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
  const dataSource = ref(transferDataSource);
  const treeData = ref(handleTreeData(tData.value, []));
  const onChecked = (e: any, checkedKeys: string[], onItemSelect: (n: any, c: boolean) => void) => {
    const { eventKey } = e.node;
    onItemSelect(eventKey, !isChecked(checkedKeys, eventKey as string | number));
  };
  async function onChangeTransfer(targetKeys: string[]) {
    treeData.value = handleTreeData(tData.value, targetKeys);
  }
</script>
