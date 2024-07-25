import { BasicPageParams } from '@/api/model/baseModel';

export interface MemorandumCategoryEntity {
  name: string;
  description: string;
  [key: string]: any;
}

export interface AddMemorandumCategoryDto {
  name: string;
  description?: string;
}

export interface UpdateMemorandumCategoryDto extends AddMemorandumCategoryDto {
  id: string;
}

export interface DeleteMemorandumCategoryDto {
  id: string;
}

export interface FindListDto {
  name?: string;
  startDate?: Date;
  endDate?: Date;
}

export type FindPageDto = BasicPageParams & FindListDto;
