export type getPostListItemType = {
  postId: number;
  isAnnouncement: boolean;
  title: string;
  writer: string;
  createAt: string;
  viewCount: number;
};

export type getPostDetailType = {
  postId: number;
  isAnnouncement: boolean;
  title: string;
  writer: string;
  createAt: string;
  viewCount: number;
  files: {
    fileId: number;
    fileUrl: string;
    fileName: string;
  }[];
  postImgs: {
    fileId: number;
    fileUrl: string;
    fileName: string;
  }[];
  content: string;
};

export type getFileWithFileIdType = {
  fileId?: number;
  fileName: string;
  fileUrl: string;
};