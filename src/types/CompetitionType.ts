import { getFileType } from "@/types/CommonType";

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

export type competitionResult = {
  division: string;
  getResultResponseRows: competitionResultRow[];
};

export type competitionResultRow = {
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

export type AddCompetitionRequestType = {
  title: string;
  divisions: string[];
  startDate: string | string[];
  endDate: string | string[];
  places: placeType[];
  relatedURL: string | null;
  ckData: any;
  ckImgRequests: getFileType[];
};
