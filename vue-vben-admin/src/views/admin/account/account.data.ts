import { getAllRoleList } from '@/api/demo/system';
import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Reg } from '@/utils/validate';

export const columns: BasicColumn[] = [
  {
    title: '账号',
    dataIndex: 'account',
    fixed: 'left',
    customRender: ({ record }) => {
      if (record.isSystem === 1) {
        return record.account
      }
      return h('span', {}, [
        h('span', {
          style: {
            marginRight: '6px'
          }
        }, record.account),
        h(Tag, {
          bordered: false,
          color: 'processing'
        }, {
          default: () => h('span', '系统')
        })
      ])
    },
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 160,
  },
  {
    title: '手机号码',
    dataIndex: 'phoneNum',
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 240,
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: 240,
    customRender: ({ record }) => {
      return h('div', record.roles.map((item) => {
        return h(Tag, {
          bordered: false,
          color: 'processing'
        }, {
          default: () => h('div', item.name)
        })
      }))
      
    }
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
    field: 'account',
    label: '账号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'phoneNum',
    label: '手机号码',
    component: 'Input',
    colProps: { span: 6 },
    isAdvanced: true,
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    colProps: { span: 6 },
    isAdvanced: true
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

export const accountBasicFormSchema: FormSchema[] = [
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
    rules: [
      {
        pattern: Reg.get('Email'),
        message: '请输入正确的邮箱',
      },
    ]
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    required: true,
    rules: [
      { min: 6, message: '必须大于6个字符' },
      { max: 25, message: '必须小于25个字符' },
    ],
    componentProps: {
      showCount: true,
      maxlength: 25
    }
  },
  {
    field: 'phoneNum',
    label: '手机号码',
    component: 'Input',
    required: true,
    rules: [
      {
        pattern: Reg.get('Phone'),
        message: '请输入正确的手机号码',
      },
    ]
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
  },
  {
    label: '状态',
    field: 'status',
    component: 'ApiSelect',
    componentProps: {
      options: [
        {
          label: '禁用',
          value: 0,
        },
        {
          label: '启用',
          value: 1,
        }
      ]
    },
    required: true,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
    componentProps: {
      showCount: true,
      maxlength: 200,
      autoSize:{ minRows: 3, maxRows: 3 }
    },
    colProps: {
      span: 24
    }
  },
];

export const accountRoleFormSchema: FormSchema[] = [
  {
    label: '角色',
    field: 'roleIds',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'name',
      valueField: 'id',
      mode: 'multiple',
      defaultValue: []
    },
    required: false,
  },
];

