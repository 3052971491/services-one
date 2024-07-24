<template>
  <BasicModal
    v-bind="$attrs"
    width="640px"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <Collapse v-model:activeKey="activeKey" ghost expandIconPosition="end">
      <CollapsePanel key="1" header="基础信息">
        <BasicForm @register="registerForm" />
      </CollapsePanel>
    </Collapse>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { Collapse, CollapsePanel } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { basicFormSchema } from './category.data';
  import { createUser, updateUser } from '@/api/demo/system';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');

  const [registerForm, { setFieldsValue, validate, clearValidate, updateSchema }] = useForm({
    name: 'memorandum-management-category-modal-form',
    labelWidth: '80px',
    baseColProps: { span: 12 },
    schemas: basicFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: true });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      rowId.value = data.record.id;
      setFieldsValue({
        ...data.record,
      });
    } else {
      setFieldsValue({
        status: 1,
      })
    }
    clearValidate();
    setModalProps({ confirmLoading: false });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增分类' : '编辑分类'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      let params = {
        ...values, id: unref(isUpdate) ? rowId.value : undefined
      }
      if (unref(isUpdate)) {
        await updateUser(params)
        createMessage.success('更新成功')
      } else {
        await createUser(params)
        createMessage.success('新增成功')
      }
      
      closeModal();
      emit('success', {
        isUpdate: unref(isUpdate),
        values: params,
      });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
  const activeKey = ref(['1', '2']);
</script>
