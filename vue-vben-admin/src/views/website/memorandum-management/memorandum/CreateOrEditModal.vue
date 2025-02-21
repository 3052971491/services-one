<template>
  <BasicModal
    v-bind="$attrs"
    width="640px"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { basicFormSchema } from './memorandum.data';
  import { add, getDetail, update } from '@/api/website/memorandum';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');

  const [registerForm, { setFieldsValue, validate, clearValidate }] = useForm({
    name: 'memorandum-management-category-modal-form',
    layout: 'vertical',
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
      const r = await getDetail({
        id: rowId.value,
      });
      setFieldsValue({
        category: data.record.categories.length > 0 ? data.record.categories[0].id : undefined,
        ...r,
      })
    }
    clearValidate();
    setModalProps({ confirmLoading: false });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑') + '备忘录');

  async function handleSubmit() {
    try {
      const { category,...values } = await validate();
      setModalProps({ confirmLoading: true });
      let params: any = {
        id: unref(isUpdate) ? rowId.value : undefined,
        categories: category ? [category] : [],
        ...values, 
      }
      if (unref(isUpdate)) {
        await update(params)
        createMessage.success('更新成功')
      } else {
        await add(params)
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
</script>
