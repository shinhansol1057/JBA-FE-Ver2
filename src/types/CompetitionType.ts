import { getFileType } from "@/types/CommonType";

export type competitionDetailType = {
  competitionId: number;
  title: string;
  startDate: Date;
  endDate: Date;
  relatedUrl: string | null;
  content: string;
  phase: string;
  places: competitionPlaceType[];
  competitionDetailAttachedFiles: competitionFileType[];
  divisions: string[];
  ckImgUrls: string[];
};

export type competitionPlaceType = {
  competitionPlaceId: number;
  placeName: string;
  latitude: number;
  longitude: number;
  address: string;
};

export type competitionFileType = {
  competitionAttachedFileId: number;
  filePath: string;
  fileName: string;
};

export type competitionResultType = {
  division: string;
  getResultResponseRows: competitionResultRowType[];
};

export type competitionResultRowType = {
  competitionResultId: number;
  gameNumber: number;
  startDate: Date;
  floor: string;
  place: string;
  homeName: string;
  homeScore: number;
  awayName: string;
  awayScore: number;
  fileName: string;
  filePath: string | null;
  state5x5: boolean;
};

export type divisionType = {
  value: string;
  label: string;
};

export type placeType = {
  competitionPlaceId?: number;
  address: string;
  placeName: string;
  latitude: number;
  longitude: number;
};

export type competitionDetailAttachedFileType = {
  competitionAttachedFileId: number;
  fileName: string;
  filePath: string;
};

export type addCompetitionRequestType = {
  title: string;
  divisions: string[];
  startDate: string;
  endDate: string;
  places: placeType[];
  relatedURL: string | null;
  ckData: any;
  ckImgRequests: getFileType[];
};

export type updateCompetitionRequestType = {
  title: string;
  divisions: string[] | undefined;
  startDate: string;
  endDate: string;
  updatePlaces: placeType[];
  relatedURL: string | null;
  ckData: any;
  ckImgRequests: getFileType[];
  uploadedAttachedFiles: string[];
  deletedCkImgUrls: string[];
};

export type addCompetitionScheduleType = {
  division: string;
  postCompetitionScheduleRow: addCompetitionScheduleRowType[];
};

export type addCompetitionScheduleRowType = {
  competitionResultId?: number;
  gameNumber: number;
  startDate: string;
  floor: string;
  place: string;
  homeName: string;
  awayName: string;
  state5x5: boolean;
};
