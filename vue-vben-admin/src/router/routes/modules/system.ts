import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/file',
  meta: {
    orderNo: 9999,
    icon: 'ion:settings-outline',
    title: t('routes.system.system.moduleName'),
  },
  children: [
    {
      path: 'file',
      name: 'File',
      meta: {
        title: t('routes.system.system.file'),
        ignoreKeepAlive: false,
      },
      component: () => import('@/views/system/file/index.vue'),
    },
  ],
};

export default system;
