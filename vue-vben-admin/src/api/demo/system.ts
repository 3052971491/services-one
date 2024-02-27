import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
  UserParams,
  ResetPasswordParams,
  PermParams,
  PermListGetResultModel,
} from './model/systemModel';
import { defHttp } from '@/utils/http/axios';

enum Api {
  AccountList = '/user/list',
  User = '/user',
  UpdatePassword = '/user/password/reset/${userId}',
  Role = '/role',
  IsAccountExist = '/system/accountExist',
  DeptList = '/system/getDeptList',
  setRoleStatus = '/system/setRoleStatus',
  MenuList = '/system/getMenuList',
  RolePageList = '/role/list',
  GetAllRoleList = '/role/list',
  Perm = '/perm',
}

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params: {
    ...params,
  } });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const createUser = (params?: UserParams) =>
  defHttp.post<AccountListGetResultModel>({ url: Api.User, params });
export const updateUser = (params?: UserParams) =>
  defHttp.put<AccountListGetResultModel>({ url: Api.User, params });
export const updatePassword = (params?: ResetPasswordParams) =>
  defHttp.put<boolean>({ url: Api.User, params });
/** 删除账号 */
export const deleteUser = (id: string) =>
  defHttp.delete<AccountListGetResultModel>({ url: Api.User, params: {
    id
  }
});

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });

/** 创建角色 */
export const createRole = (params?: RoleParams) =>
  defHttp.post<AccountListGetResultModel>({ url: Api.Role, params });
/** 修改角色 */
export const updateRole = (params?: RoleParams) =>
  defHttp.put<AccountListGetResultModel>({ url: Api.Role, params });
/** 删除角色 */
export const deleteRole = (id: string) =>
  defHttp.delete<AccountListGetResultModel>({ url: Api.Role, params: {
    id
  }
});

/** 创建接口 */
export const createPerm = (params?: PermParams) =>
  defHttp.post({ url: Api.Perm, params });
/** 修改接口 */
export const updatePerm = (params?: PermParams) =>
  defHttp.put({ url: Api.Perm, params });
/** 删除接口 */
export const deletePerm = (id: string) =>
  defHttp.delete({ url: Api.Perm, params: {
    id
  }
});
