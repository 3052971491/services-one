import { BasicFetchResult, BasicPageParams } from '@/api/model/baseModel';

export type UploadFileParams = {
  file?: File;
  name: string;
  remark?: Date;
  [key: string]: any;
};

export type FileParams = BasicPageParams & {
  account?: string;
  nickname?: string;
  startDay?: Date;
  endDay?: Date;
  [key: string]: any;
};

export interface FileListItem {
  id: string;
  name: string;
  url: string;
  size: string;
  type: number;
  createDate: string;
  remark: string;
}
export type FileListGetResultModel = BasicFetchResult<FileListItem>;
