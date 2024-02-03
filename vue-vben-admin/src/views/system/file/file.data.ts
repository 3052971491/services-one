import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tooltip, TypographyLink } from 'ant-design-vue';
import { bytesToMegabytes } from '@/utils';

export const columns: BasicColumn[] = [
  {
    title: '文件名称',
    dataIndex: 'name',
    width: 360,
    fixed: 'left',
    customRender: ({ record }) => {
      return h(Tooltip, {
        placement: 'top'
      }, {
        default: () => {
          return h(
            TypographyLink,
            {
              ellipsis: true,
              href: record.url,
              target: '_blank',
              content: record.name
            },
          );
        },
        title: () => record.name
      })
    },
  },
  {
    title: '文件类型',
    dataIndex: 'type',
    width: 140,
  },
  {
    title: '文件大小',
    dataIndex: 'size',
    width: 100,
    customRender: ({ record }) => {
      return bytesToMegabytes(record.size) + 'M';
    },
  },
  {
    title: '文件路径',
    dataIndex: 'url',
    width: 300,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 240,
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    width: 180,
    format: 'date|YYYY-MM-DD HH:mm:ss',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '文件名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'createDate',
    label: '创建日期',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始日期', '结束日期'],
    },
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '文件名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'file',
    label: '文件',
    required: true,
    slot: 'file',
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
