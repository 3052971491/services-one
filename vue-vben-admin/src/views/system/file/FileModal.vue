<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <!--  -->
      <template #file="{ model, field }">
        <Upload
          v-model:file-list="model[field]"
          name="file"
          :multiple="false"
          @drop="handleDrop"
          :beforeUpload="() => false"
          :max-count="1"
          :customRequest="handleCustomRequest"
        >
          <p class="ant-upload-drag-icon">
            <inbox-outlined></inbox-outlined>
          </p>
          <p class="ant-upload-text">单击或拖动文件到此区域进行上传</p>
          <p class="ant-upload-hint"> 支持单个或批量上传 </p>
        </Upload>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { Upload } from 'ant-design-vue';
  import { InboxOutlined } from '@ant-design/icons-vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './file.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { uploadFile } from '@/api/system/file';
  import { UploadFileParams } from '@/api/system/model/file';

  const { createMessage } = useMessage();

  defineOptions({ name: 'FileModal' });
  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');

  const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      rowId.value = data.record.id;
      setFieldsValue({
        ...data.record,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增文件' : '编辑文件'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      console.log(values);
      const { file, name, remark } = values;
      const params: UploadFileParams = {
        file: file.length > 0 ? file[0].originFileObj : undefined,
        name,
        remark,
      };
      console.log(params);

      if (unref(isUpdate)) {
        // await updateRole({ id: rowId.value, ...values });
        createMessage.success('更新成功');
      } else {
        await uploadFile(params);
        createMessage.success('新增成功');
      }
      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  const handleDrop = () => {};

  const handleCustomRequest = ({ file }) => {
    // 处理文件流
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      // 处理完成后将文件信息传递给 v-model:file-list
      setFieldsValue({
        file: [
          {
            uid: file.uid,
            name: file.name,
            status: 'done',
            url: window.URL.createObjectURL(file),
            thumbUrl: window.URL.createObjectURL(file),
            size: file.size,
            type: file.type,
          },
        ],
      });
    };
  };
</script>
<style lang="less" scoped>
  :deep(.ant-upload) {
    position: relative;
    width: 100%;
    transition: border-color 0.3s;
    border: 1px dashed #d9d9d9;
    border-radius: 8px;
    background: rgb(0 0 0 / 2%);
    text-align: center;
    cursor: pointer;

    .anticon {
      color: #1677ff;
      font-size: 48px;
    }
  }

  .ant-upload-drag-icon {
    margin-bottom: 16px;
  }

  .ant-upload-text {
    margin: 0 0 4px;
    color: rgb(0 0 0 / 88%);
    font-size: 16px;
  }

  .ant-upload-hint {
    color: rgb(0 0 0 / 45%);
    font-size: 14px;
  }
</style>
