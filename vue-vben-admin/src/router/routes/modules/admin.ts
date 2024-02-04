import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const admin: AppRouteModule = {
  path: '/admin',
  name: 'Admin',
  component: LAYOUT,
  redirect: '/admin/account',
  meta: {
    orderNo: 2000,
    icon: 'ion:settings-outline',
    title: t('routes.admin.admin.moduleName'),
  },
  children: [
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        title: t('routes.admin.admin.account'),
        ignoreKeepAlive: false,
      },
      component: () => import('@/views/admin/account/index.vue'),
    },
    // {
    //   path: 'account_detail/:id',
    //   name: 'AccountDetail',
    //   meta: {
    //     hideMenu: true,
    //     title: t('routes.demo.system.account_detail'),
    //     ignoreKeepAlive: true,
    //     showMenu: false,
    //     currentActiveMenu: '/system/account',
    //   },
    //   component: () => import('@/views/demo/system/account/AccountDetail.vue'),
    // },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: t('routes.admin.admin.role'),
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/admin/role/index.vue'),
    },
    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: t('routes.admin.admin.menu'),
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/admin/menu/index.vue'),
    },
    // {
    //   path: 'dept',
    //   name: 'DeptManagement',
    //   meta: {
    //     title: t('routes.demo.system.dept'),
    //     ignoreKeepAlive: true,
    //   },
    //   component: () => import('@/views/demo/system/dept/index.vue'),
    // },
    // {
    //   path: 'changePassword',
    //   name: 'ChangePassword',
    //   meta: {
    //     title: t('routes.demo.system.password'),
    //     ignoreKeepAlive: true,
    //   },
    //   component: () => import('@/views/demo/system/password/index.vue'),
    // },
  ],
};

export default admin;
