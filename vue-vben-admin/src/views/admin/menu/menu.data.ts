import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import Icon from '@/components/Icon/Icon.vue';
import { MenuType, StatusValue } from '@/api/admin/model/menu';

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 50,
    align: 'center',
    customRender: ({ record }) => {
      if (!record?.icon) return
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: '权限标识',
    dataIndex: 'permission',
    width: 180,
  },
  {
    title: '组件',
    dataIndex: 'componentPath',
  },
  {
    title: '排序',
    dataIndex: 'orderNum',
    width: 50,
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = status === StatusValue.NORMAL;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
    format: 'date|YYYY-MM-DD HH:mm:ss',
  },
];

const isDir = (type: MenuType) => type === MenuType.MENU;
const isMenu = (type: MenuType) => type === MenuType.TAB;
const isButton = (type: MenuType) => type === MenuType.BUTTON;

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'hasBtn',
    label: '菜单',
    component: 'Select',
    defaultValue: 0,
    helpMessage: '菜单, 是否显示按钮',
    componentProps: {
      options: [
        { label: '不包含按钮', value: 0 },
        { label: '包含按钮', value: 1 },
      ],
    },
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'type',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: MenuType.MENU,
    componentProps: {
      options: [
        { label: '目录', value: MenuType.MENU },
        { label: '菜单', value: MenuType.TAB},
        { label: '按钮', value: MenuType.BUTTON },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
  },

  {
    field: 'parentId',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },

  {
    field: 'orderNum',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },

  {
    field: 'routePath',
    label: '路由地址',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'componentPath',
    label: '组件路径',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'permission',
    label: '权限标识',
    component: 'Input',
    ifShow: ({ values }) => !isDir(values.type),
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: StatusValue.NORMAL,
    componentProps: {
      options: [
        { label: '启用', value: StatusValue.NORMAL },
        { label: '禁用', value: StatusValue.FORBIDDEN },
      ],
    },
  },
];
