export enum UserType {
  /** 系统用户 */
  SUPER_ADMIN = 0,
  /** 普通用户 */
  ORDINARY_USER = 1
}


export enum RoleType {
  /** 系统角色 */
  SUPER_ROLE = 0,
  /** 普通角色 */
  ORDINARY_ROLE = 1,
}

export enum StatusValue {
  /** 禁用 */
  FORBIDDEN = 0,
  /** 正常使用 */
  NORMAL = 1
}

export enum StatusValue2 {
  /** 否 */
  NO = 0,
  /** 是 */
  YES = 1
}

export enum MenuType {
  /** 菜单 */
  MENU = 1,
  /** tabs 页面菜单 */
  TAB = 2,
  /** 按钮 */
  BUTTON = 3
}

export enum PermType {
  /** 组 */
  GROUP,
  /** 接口 */
  API,
}
