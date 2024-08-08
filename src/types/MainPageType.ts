export type bannerAnnouncement = {
  postId: number;
  title: string;
  writer: string;
  isAnnouncement: boolean;
  viewCount: number;
  createAt: Date;
};

export type bannerCompetition = {
  competitionId: number;
  title: string;
  startDate: Date;
  endDate: Date;
  places: string[];
};
