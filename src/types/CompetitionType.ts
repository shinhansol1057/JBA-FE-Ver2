export type competitionDetail = {
  competitionId: number;
  title: string;
  startDate: Date;
  endDate: Date;
  relatedUrl: string | null;
  content: string;
  phase: string;
  places: competitionPlace[];
  competitionDetailAttachedFiles: competitionFile[];
  divisions: string[];
  ckImgUrls: string[];
};

export type competitionPlace = {
  competitionPlaceId: number;
  placeName: string;
  latitude: number;
  longitude: number;
  address: string;
};

export type competitionFile = {
  competitionAttachedFileId: number;
  filePath: string;
  fileName: string;
};
