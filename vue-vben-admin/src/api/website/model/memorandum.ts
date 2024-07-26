import { BasicPageParams } from '@/api/model/baseModel';
import { StatusValue } from '@/enums/commonEnum';

export interface MemorandumEntity {
  name: string;
  categories: string[];
  content: string;
  stickyPost: StatusValue;
  [key: string]: any;
}

export interface AddMemorandumDto {
  name: string;
  categories: string[];
  content: string;
}

export interface UpdateMemorandumDto extends AddMemorandumDto {
  id: string;
}

export interface DeleteMemorandumDto {
  id: string;
}

export interface FindListDto {
  name?: string;
  categories: string[];
  startDate?: Date;
  endDate?: Date;
}

export type FindPageDto = BasicPageParams & FindListDto;

export interface SetStickPostDto {
  id: string;
  stickyPost: StatusValue;
}
