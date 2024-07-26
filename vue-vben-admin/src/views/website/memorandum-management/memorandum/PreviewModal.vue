<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="预览">
    <MarkdownViewer v-model:value="memorandum.content" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { getDetail } from '@/api/website/memorandum';
  import { MemorandumEntity } from '@/api/website/model/memorandum';
  import { MarkdownViewer } from '@/components/Markdown';
  import { StatusValue } from '@/enums/commonEnum';

  const emit = defineEmits(['success', 'register']);
  const rowId = ref('');
  const memorandum = ref<MemorandumEntity>({
    name: '',
    stickyPost: StatusValue.NO,
    categories: [],
    content: '',
  });

  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: true });
    rowId.value = data.record.id;
    memorandum.value = await getDetail({
      id: rowId.value,
    });
    setModalProps({ confirmLoading: false });
  });
</script>
