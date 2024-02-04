<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :closable="false"
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { useMessage } from '@/hooks/web/useMessage';
  import { createMenu, getAllList, updateMenu } from '@/api/admin/menu';
  import { listToTree } from '@/utils/helper/treeHelper';

  const { createMessage } = useMessage();

  defineOptions({ name: 'MenuDrawer' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');

  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { lg: 12, md: 24 },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    let treeData = await getAllList();
    treeData = treeData.filter((item) => !!data?.record?.id ? item.id !== data.record.id : true);
    treeData = listToTree(treeData, {
      pid: 'parentId',
    });
    updateSchema({
      field: 'parentId',
      componentProps: { treeData },
    });
    if (unref(isUpdate)) {
      rowId.value = data.record.id;
      setFieldsValue(data.record);
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

  async function handleSubmit() {
    try {
      const { orderNum: num, ...values }: any = await validate();
      setDrawerProps({ confirmLoading: true });
      const orderNum = parseInt(num);
      if (unref(isUpdate)) {
        await updateMenu({ ...values, orderNum, id: unref(rowId) });
        createMessage.success('更新成功');
      } else {
        await createMenu({ ...values, orderNum });
        createMessage.success('新增成功');
      }
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
