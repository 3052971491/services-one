import { AppRouteRecordRaw } from '@/router/types';
import { asyncRoutes } from '@/router/routes';
import { transformRouteToMenu } from '@/router/helper/menuHelper';
import { useMessage } from '@/hooks/web/useMessage';
import { useI18n } from '@/hooks/web/useI18n';
import { PageEnum } from '@/enums/pageEnum';
import { useUserStore } from '../modules/user';
import { filter, listToTree } from '@/utils/helper/treeHelper';
import { usePermissionStore } from '@/store/modules/permission';
import { flatMultiLevelRoutes, transformObjToRoute } from '@/router/helper/routeHelper';
import { toRaw } from 'vue';
import { getAllList } from '@/api/admin/menu';
import { MenuListItem, MenuType } from '@/api/admin/model/menu';

/**
 * 生成系统路由
 * @description 前端默认路由, 动态配置路由, 不使用vben自带的路由配置
 */
export async function buildSystemRoutesAction(): Promise<AppRouteRecordRaw[]> {
  const { t } = useI18n();
  const { createMessage } = useMessage();
  const permissionStore = usePermissionStore();
  createMessage.loading({
    content: t('sys.app.menuLoading'),
    duration: 1,
  });

  // 前端的默认路由
  const [frontRoutes, frontMenus] = await getFrontRoutes();

  // 获取后端路由
  const [backRoutes, backMenus] = await getBackRoutes();

  // 合并
  let routes: AppRouteRecordRaw[] = [...frontRoutes, ...backRoutes];
  let menus: AppRouteRecordRaw[] = [...frontMenus, ...backMenus];

  // 菜单排序排序
  menus.sort((a, b) => {
    return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
  });
  patchHomeAffix(routes);
  permissionStore.setBackMenuList(menus);
  return routes;
}
const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
  const userStore = useUserStore();
  if (!routes || routes.length === 0) return;
  let homePath: string = userStore.getUserInfo.homePath || PageEnum.BASE_HOME;

  function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
    if (parentPath) parentPath = parentPath + '/';
    routes.forEach((route: AppRouteRecordRaw) => {
      const { path, children, redirect } = route;
      const currentPath = path.startsWith('/') ? path : parentPath + path;
      if (currentPath === homePath) {
        if (redirect) {
          homePath = route.redirect! as string;
        } else {
          route.meta = Object.assign({}, route.meta, { affix: true });
          throw new Error('end');
        }
      }
      children && children.length > 0 && patcher(children, currentPath);
    });
  }

  try {
    patcher(routes);
  } catch (e) {
    // 已处理完毕跳出循环
  }
  return;
};
const routeFilter = (route: AppRouteRecordRaw) => {
  const userStore = useUserStore();
  const roleList = toRaw(userStore.getRoleList) || [];
  const { meta } = route;
  // 抽出角色
  const { roles } = meta || {};
  if (!roles) return true;
  // 进行角色权限判断
  return roleList.some((role) => roles.includes(role));
};
const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
  const { meta } = route;
  // ignoreRoute 为true 则路由仅用于菜单生成，不会在实际的路由表中出现
  const { ignoreRoute } = meta || {};
  // arr.filter 返回 true 表示该元素通过测试
  return !ignoreRoute;
};

async function getFrontRoutes() {
  let routes = filter(asyncRoutes, routeFilter);
  const menuList = transformRouteToMenu(routes, true);
  routes = flatMultiLevelRoutes(routes);
  return [routes, menuList];
}

async function getBackRoutes() {
  let result = await getAllList();
  let routes: AppRouteRecordRaw[] = [];

  routes = transformToRoute(result);
  // 动态引入组件
  routes = transformObjToRoute(routes);
  //  后台路由到菜单结构
  const backMenuList = transformRouteToMenu(routes);

  routes = routes.filter(routeRemoveIgnoreFilter);
  routes = flatMultiLevelRoutes(routes);

  return [routes, backMenuList];
}

function transformToRoute(menus: MenuListItem[]): AppRouteRecordRaw[] {
  let routes: AppRouteRecordRaw[] = menus.map((item) => {
    let obj: AppRouteRecordRaw = {
      id: item.id,
      parentId: item.parentId || undefined,
      name: item.name,
      meta: {
        title: item.name,
        orderNo: item.orderNum,
        icon: item.icon,
        ignoreKeepAlive: true,
      },
      path: item.routePath || '',
      component: item.componentPath || undefined,
    };
    if (item.type === MenuType.MENU) {
      obj.children = [];
      obj.component = 'LAYOUT';
    }
    return obj;
  });

  // list to tree
  routes = listToTree(routes, {
    pid: 'parentId',
  });
  return routes;
}
