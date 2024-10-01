export type PaginationType = {
  pageNumber: number;
  pageSize: number;
  totalItem: number;
  totalPage: number;
};

export type CommonResponse = {
  code: number
  message?: string
  pagination?: PaginationType
  result?: any;
};
