import { BasicPageParams, BasicFetchResult } from '@/api/model/baseModel';
import { Key } from '@/components/Menu/src/types';
import { StatusEnum } from '@/enums/userEnum';

export type AccountParams = BasicPageParams & {
  account?: string;
  nickname?: string;
  [key: string]: any;
};

export type UserParams = {
  id?: string;
  status?: StatusEnum;
  phoneNum?: string;
  email?: string;
  avatar?: string;
  roleIds?: [];
  [key: string]: any;
};

export type ResetPasswordParams = {
  userId: string;
  [key: string]: any;
};

export type RoleParams = {
  name?: string;
  value?: string;
  remark?: string;
  menus?: Key[];
  apis?: Key[];
  [key: string]: any;
};

export type RolePageParams = BasicPageParams & RoleParams;

export type DeptParams = {
  deptName?: string;
  status?: string;
};

export type MenuParams = {
  menuName?: string;
  status?: string;
};

export interface AccountListItem {
  id: string;
  account: string;
  email: string;
  nickname: string;
  role: number;
  createTime: string;
  remark: string;
  status: number;
}

export interface DeptListItem {
  id: string;
  orderNo: string;
  createTime: string;
  remark: string;
  status: number;
}

export interface MenuListItem {
  id: string;
  orderNo: string;
  createTime: string;
  status: number;
  icon: string;
  component: string;
  permission: string;
}

export interface RoleListItem {
  id: string;
  roleName: string;
  roleValue: string;
  status: number;
  orderNo: string;
  createTime: string;
}

/**
 * @description: Request list return value
 */
export type AccountListGetResultModel = BasicFetchResult<AccountListItem>;

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];
