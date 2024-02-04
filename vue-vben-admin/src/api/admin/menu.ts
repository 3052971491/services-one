import { defHttp } from '@/utils/http/axios';
import { CreateOrUpdateMenuParams, MenuListItem } from './model/menu';

enum Api {
  GetAll = '/menu/all',
  // getAllButtonByMenuId = '/menu/one/:parentId/btns',
  Menu = '/menu'
}

export const createMenu = (params?: CreateOrUpdateMenuParams) =>
  defHttp.post({ url: Api.Menu, params });
export const updateMenu = (params?: CreateOrUpdateMenuParams) =>
  defHttp.put({ url: Api.Menu, params });

export const getAllList = (params?: CreateOrUpdateMenuParams) =>
  defHttp.get<MenuListItem[]>({ url: Api.GetAll, params });
