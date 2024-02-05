import { defHttp } from '@/utils/http/axios';
import { CreateOrUpdateMenuParams, MenuListItem } from './model/menu';

enum Api {
  GetAll = '/menu/all',
  // getAllButtonByMenuId = '/menu/one/:parentId/btns',
  Menu = '/menu'
}

/** 创建菜单 */
export const createMenu = (params?: CreateOrUpdateMenuParams) =>
  defHttp.post({ url: Api.Menu, params });
/** 更新菜单 */
export const updateMenu = (params?: CreateOrUpdateMenuParams) =>
  defHttp.put({ url: Api.Menu, params });
/** 获取所有菜单 */
export const getAllList = (params?: CreateOrUpdateMenuParams) =>
  defHttp.get<MenuListItem[]>({ url: Api.GetAll, params });
/** 删除菜单 */
export const deleteMenu = (params: { id: string }) =>
  defHttp.delete<MenuListItem[]>({ url: Api.Menu, params });
