import { defHttp } from '@/utils/http/axios';
import {
  AddMemorandumCategoryDto,
  DeleteMemorandumCategoryDto,
  FindListDto,
  FindPageDto,
  UpdateMemorandumCategoryDto,
} from './model/memorandum-category';

enum Api {
  MemorandumCategory = '/memorandum-category',
}

export const add = (params: AddMemorandumCategoryDto) =>
  defHttp.post<any>({ url: Api.MemorandumCategory, params });

export const del = (params: DeleteMemorandumCategoryDto) =>
  defHttp.delete<any>({ url: Api.MemorandumCategory, params });

export const update = (params: UpdateMemorandumCategoryDto) =>
  defHttp.put<any>({ url: Api.MemorandumCategory, params });

export const getPage = (params: FindPageDto) =>
  defHttp.get<any>({ url: Api.MemorandumCategory + '/getPage', params });

export const getList = (params: FindListDto) =>
  defHttp.get<any>({ url: Api.MemorandumCategory + '/getList', params });
