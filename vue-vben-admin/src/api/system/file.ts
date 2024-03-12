import { ContentTypeEnum } from '@/enums/httpEnum';
import { UploadFileParams, FileParams, FileListGetResultModel } from './model/file';
import { defHttp } from '@/utils/http/axios';

enum Api {
  Oss = '/oss',
}

export const getFileList = (params: FileParams) =>
  defHttp.get<FileListGetResultModel>({ url: Api.Oss, params });
export const uploadFile = (params: UploadFileParams) =>
  defHttp.post<FileListGetResultModel>({
    url: Api.Oss,
    params,
    headers: {
      'Content-type': ContentTypeEnum.FORM_DATA,
    },
  });
