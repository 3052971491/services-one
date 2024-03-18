export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}


export interface BasicEntityParams {
  id: string;
  createdAt: string;
  createdBy: string;
  deletedAt: string | null;
  deletedBy: string;
  /** 是否删除 */
  isDeleted: boolean;
  updatedAt: string | null;
  updatedBy: string;
}
