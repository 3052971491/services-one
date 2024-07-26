import { h } from 'vue';
import { Switch, Tag } from 'ant-design-vue';
import { BasicColumn, FormSchema } from '@/components/Table';
import { MarkDown } from '@/components/Markdown';
import { getList } from '@/api/website/memorandum-category';
import { StatusValue } from '@/enums/commonEnum';
export const columns: BasicColumn[] = [
  {
    title: '标题',
    dataIndex: 'name',
    width: 300,
  },
  {
    title: '置顶',
    width: 80,
    dataIndex: 'stickyPost',
    helpMessage: ['相同分类只拥有一个置顶', '每一个分类可拥有一个置顶'],
    align: 'center',
    customRender: ({ record }) => {
      const s = record.stickyPost === StatusValue.YES;
      return h('span', {}, [
        h(
          Tag,
          {
            bordered: false,
            color: s ? 'success' : 'error',
          },
          {
            default: () => h('span', s ? '是': '否'),
          },
        ),
      ]);
    },
  },
  {
    title: '类型',
    width: 160,
    dataIndex: 'categories',
    customRender: ({ record }) => {
      return record.categories.length > 0 ? record.categories[0].name : '';
    },
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
    field: 'categories',
    label: '类型',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      mode: 'multiple',
      api: () => getList({}),
    },
  },
  {
    field: 'createDate',
    label: '创建时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      showTime: true,
    },
    colProps: { span: 6 },
    isAdvanced: true,
  },
];

export const basicFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '标题',
    component: 'Input',
    required: true,
    colProps: {
      span: 6,
    },
    componentProps: {
      showCount: true,
      maxlength: 100,
    },
  },
  {
    field: 'category',
    label: '类型',
    component: 'ApiSelect',
    required: true,
    colProps: {
      span: 6,
    },
    componentProps: {
      api: () => getList({}),
    },
  },
  {
    field: 'content',
    component: 'Input',
    label: '内容',
    defaultValue: '',
    required: true,
    colProps: {
      span: 24,
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
