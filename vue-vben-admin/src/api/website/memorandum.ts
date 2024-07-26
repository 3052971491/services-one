import { defHttp } from '@/utils/http/axios';
import {
  AddMemorandumDto,
  DeleteMemorandumDto,
  FindPageDto,
  SetStickPostDto,
  UpdateMemorandumDto,
} from './model/memorandum';

enum Api {
  Memorandum = '/memorandum',
}

export const add = (params: AddMemorandumDto) =>
  defHttp.post<any>({ url: Api.Memorandum, params });

export const del = (params: DeleteMemorandumDto) =>
  defHttp.delete<any>({ url: Api.Memorandum, params });

export const update = (params: UpdateMemorandumDto) =>
  defHttp.put<any>({ url: Api.Memorandum, params });

export const getPage = (params: FindPageDto) =>
  defHttp.get<any>({ url: Api.Memorandum + '/getPage', params });

export const setStickPost = (params: SetStickPostDto) =>
  defHttp.put<any>({ url: Api.Memorandum + '/setStickPost', params });

export const getDetail = (params: DeleteMemorandumDto) =>
  defHttp.get<any>({ url: Api.Memorandum + '/getDetail', params });
