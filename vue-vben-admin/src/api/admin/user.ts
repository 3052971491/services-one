import { defHttp } from '@/utils/http/axios';
import { MenuListItem } from './model/menu';

enum Api {
  User = '/user',
  FindMenuByUserId = '/user/menus',
}

/** 根据用户获取菜单 */
export const findMenuByUserId = () => defHttp.get<MenuListItem[]>({ url: Api.FindMenuByUserId });
