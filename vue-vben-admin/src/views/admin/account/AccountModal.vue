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
      <CollapsePanel key="2" header="用户角色">
        <BasicForm @register="registerForm2" />
      </CollapsePanel>
    </Collapse>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { Collapse, CollapsePanel } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { accountBasicFormSchema, accountRoleFormSchema } from './account.data';
  import { createUser, updateUser } from '@/api/demo/system';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  
  defineOptions({ name: 'AccountModal' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');

  const [registerForm, { setFieldsValue, validate, clearValidate, updateSchema }] = useForm({
    name: 'account-modal-form-basic-info',
    labelWidth: '80px',
    baseColProps: { span: 12 },
    schemas: accountBasicFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });
  const [registerForm2, obj] = useForm({
    name: 'account-modal-form-permissions',
    labelWidth: '80px',
    baseColProps: { span: 12 },
    schemas: accountRoleFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: true });
    isUpdate.value = !!data?.isUpdate;
    // 当编辑账号时, 密码设置未非必填
    updateSchema({
      field: 'password',
      defaultValue: !unref(isUpdate) ? 'ABC#123' : '',
      required: !unref(isUpdate)
    });
    if (unref(isUpdate)) {
      rowId.value = data.record.id;
      setFieldsValue({
        ...data.record,
      });
      obj.setFieldsValue({
        ...data.record,
        roleIds: data.record.roles.map((item) => item.id),
      });
    } else {
      setFieldsValue({
        status: 1,
      })
    }
    clearValidate();
    setModalProps({ confirmLoading: false });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

  async function handleSubmit() {
    try {
      const values = await validate();
      const values2 = await obj.validate();
      setModalProps({ confirmLoading: true });
      let params = {
        ...values, ...values2, id: unref(isUpdate) ? rowId.value : undefined
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
