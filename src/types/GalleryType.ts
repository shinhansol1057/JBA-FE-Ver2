export type getGalleryList = {
  totalPages: number;
  totalGalleries: number;
  galleries: getGallery[];
};

export type getGallery = {
  galleryId: number;
  title: string;
  fileName: string;
  imgUrl: string;
  createAt: string;
};

export type getGalleryDetail = {
  fileId: number;
  fileName: string;
  fileUrl: string;
};
