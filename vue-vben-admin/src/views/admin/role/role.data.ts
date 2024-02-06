import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'name',
    customRender: ({ record }) => {
      if (record.isSystem === 1) {
        return record.name;
      }
      return h('span', {}, [
        h(
          'span',
          {
            style: {
              marginRight: '6px',
            },
          },
          record.name,
        ),
        h(
          Tag,
          {
            bordered: false,
            color: 'processing',
          },
          {
            default: () => h('span', '系统'),
          },
        ),
      ]);
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 240,
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
    label: '角色名称',
    component: 'Input',
    colProps: { span: 6 },
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
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '角色名称',
    required: true,
    component: 'Input',
    componentProps: {
      showCount: true,
      maxlength: 50,
    },
  },
  {
    field: 'value',
    label: '角色值',
    required: true,
    component: 'Input',
    componentProps: {
      showCount: true,
      maxlength: 50,
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
    componentProps: {
      showCount: true,
      maxlength: 200,
    },
  },
];

export const permissionFormSchema: FormSchema[] = [
  {
    label: '权限',
    field: 'permission',
    slot: 'permission',
    required: true,
    defaultValue: []
  },
];
