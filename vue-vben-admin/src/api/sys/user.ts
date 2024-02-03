import { defHttp } from '@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel, RegisterParams } from './model/userModel';

import { ErrorMessageMode } from '#/axios';

enum Api {
  Login = '/login',
  Register = '/register',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

/**
 * @description: 用户登录
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  const obj = {
    account: params.username,
    password: params.password
  }
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params: obj,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 用户注册
 */
export function registerApi(params: RegisterParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<string>(
    {
      url: Api.Register,
      params
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
