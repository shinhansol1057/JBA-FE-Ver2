export type paginationResponse = {
  code: number;
  message: string;
  data: any;
};

export type paginationType = {
  content: any;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};

export type getFileWithIdType = {
  fileId: number;
  fileUrl: string;
  fileName: string;
};

export type getFileType = {
  fileUrl: string;
  fileName: string;
};
