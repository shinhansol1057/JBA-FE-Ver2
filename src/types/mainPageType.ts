export type BannerAnnouncement = {
  postId: number;
  title: string;
  writer: string;
  isAnnouncement: boolean;
  viewCount: number;
  createAt: Date;
};

export type BannerCompetition = {
  competitionId: number;
  title: string;
  startDate: Date;
  endDate: Date;
  places: string[];
};

export type Gallery = {
  galleryId: number;
  title: string;
  fileName: string;
  imgUrl: string;
  createAt: string;
};
