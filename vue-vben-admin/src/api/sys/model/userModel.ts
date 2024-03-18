import { StatusValue } from '@/api/admin/model/menu';
import { BasicEntityParams } from '@/api/model/baseModel';
import { UserType } from '@/enums/userEnum';

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  accessToken: string;
  refreshToken: string;
}

/**
 * @description: Get user information return value
 */
export type GetUserInfoModel = BasicEntityParams & {
  // 账号
  account: string;
  // 头像
  avatar: string;
  // 邮箱
  email: string;
  /** 是否系统 */
  isSystem: UserType;
  // 昵称
  nickname: string;
  // 密码
  password: string;
  /** 输出屏蔽盐 */
  salt: string;
  // 手机号码
  phoneNum: string;
  // 备注
  remark: string;
  /** 所属状态 */
  status: StatusValue;
  roles: RoleInfo[];
  [key: string]: any;
};

export interface RegisterParams {
  phoneNum: string;
  password: string;
  confirmPassword: string;
}
