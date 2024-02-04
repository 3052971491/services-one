export enum MenuType {
  /** 菜单 */
  MENU = 1,
  /** tabs 页面菜单 */
  TAB = 2,
  /** 按钮 */
  BUTTON = 3
}

export enum StatusValue {
  /** 禁用 */
  FORBIDDEN = 0,
  /** 正常使用 */
  NORMAL = 1
}

export interface CreateOrUpdateMenuParams {
  type: MenuType;
  parentId?: string;
  name: string;
  orderNum: number;
  icon?: string;
  routePath?: string;
  status: StatusValue;
  permission?: string;
  componentPath?: string;
  [key: string]: any;
}

export interface MenuListItem {
  type: MenuType;
  parentId?: string;
  name: string;
  orderNum: number;
  icon?: string;
  routePath?: string;
  status: StatusValue;
  permission?: string;
  componentPath?: string;
}
