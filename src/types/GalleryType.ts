export type getGalleryListType = {
  totalPages: number;
  totalGalleries: number;
  galleries: getGalleryType[];
};

export type getGalleryType = {
  galleryId: number;
  title: string;
  fileName: string;
  imgUrl: string;
  createAt: string;
};

export type getGalleryDetailType = {
  fileId: number;
  fileName: string;
  fileUrl: string;
};
