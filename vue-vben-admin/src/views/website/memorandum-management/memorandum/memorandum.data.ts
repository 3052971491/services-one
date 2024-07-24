import { h } from 'vue';
import { BasicColumn, FormSchema } from '@/components/Table';
import { MarkDown } from '@/components/Markdown';
export const columns: BasicColumn[] = [
  {
    title: '标题',
    dataIndex: 'name',
    width: 300,
  },
  {
    title: '分类',
    width: 160,
    dataIndex: 'category',
  },
  {
    title: '',
    dataIndex: 'xxx',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
    format: 'date|YYYY-MM-DD HH:mm:ss',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '标题',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'category',
    label: '分类',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'createDate',
    label: '创建时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      showTime: true
    },
    colProps: { span: 6 },
    isAdvanced: true
  },
];

export const basicFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '标题',
    component: 'Input',
    required: true,
    colProps: {
      span: 6
    },
    componentProps: {
      showCount: true,
    }
  },
  {
    field: 'category',
    label: '分类',
    component: 'Input',
    required: true,
    colProps: {
      span: 6
    },
    componentProps: {
      showCount: true,
    }
  },
  {
    field: 'markdown',
    component: 'Input',
    label: '内容',
    defaultValue: '',
    required: true,
    colProps: {
      span: 24
    },
    render: ({ model, field }) => {
      return h(MarkDown, {
        value: model[field],
        height: 420,
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
];

