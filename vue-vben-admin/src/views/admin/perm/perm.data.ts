import { BasicColumn, FormSchema } from '@/components/Table';
import { RequestEnum } from '@/enums/httpEnum';
import { PermType } from '@/enums/permEnum';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 300,
  },
  {
    title: '路由方法',
    dataIndex: 'method',
    width: 80,
    customRender: ({ record }) => {
      if (record.type === PermType.GROUP) return record.method;
      return h('span', {}, [
        h(
          Tag,
          {
            bordered: false,
            color:
              record.method === RequestEnum.POST
                ? 'success'
                : record.method === RequestEnum.PUT
                  ? 'warning'
                  : record.method === RequestEnum.DELETE
                    ? 'error'
                    : 'processing',
          },
          {
            default: () => h('span', record.method),
          },
        ),
      ]);
    },
  },
  {
    title: 'API 路径',
    dataIndex: 'path',
    minWidth: 300,
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
    label: '名称',
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
    field: 'type',
    label: '类型',
    component: 'RadioButtonGroup',
    defaultValue: PermType.GROUP,
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      return {
        options: [
          { label: '菜单', value: PermType.GROUP },
          { label: '接口', value: PermType.API },
        ],
      };
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'parentId',
    label: '菜单',
    component: 'Select',
    required: true,
    componentProps: {
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    ifShow: ({ values }) => values.type === PermType.API,
  },
  {
    field: 'name',
    label: '名称',
    required: true,
    component: 'Input',
    componentProps: {
      showCount: true,
      maxlength: 20,
    },
  },
  {
    field: 'method',
    label: '方法',
    component: 'RadioButtonGroup',
    required: true,
    componentProps: {
      options: Object.values(RequestEnum).map((item) => {
        return {
          label: item,
          value: item,
        };
      }),
      getPopupContainer: () => document.body,
    },
    ifShow: ({ values }) => values.type === PermType.API,
  },
  {
    field: 'path',
    label: 'API 路径',
    required: true,
    component: 'Input',
    componentProps: {
      showCount: true,
      maxlength: 100,
    },
    ifShow: ({ values }) => values.type === PermType.API,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
    componentProps: {
      showCount: true,
      maxlength: 100,
    },
  },
];
