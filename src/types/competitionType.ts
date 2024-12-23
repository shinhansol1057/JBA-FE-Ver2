import { GetFileType, GetFileWithIdType } from "@/types/commonType";

export type CompetitionDetailType = {
  competitionId: number;
  title: string;
  startDate: Date;
  endDate: Date;
  relatedUrl: string | null;
  content: string;
  phase: string;
  participationStartDate: Date | null;
  participationEndDate: Date | null;
  places: CompetitionPlaceType[];
  competitionDetailAttachedFiles: GetFileWithIdType[];
  divisions: DivisionResponseType[];
  ckImgUrls: string[];
};

export type CompetitionPlaceType = {
  competitionPlaceId: number;
  placeName: string;
  latitude: number;
  longitude: number;
  address: string;
};

export type CompetitionResultType = {
  division: string;
  getResultResponseRows: CompetitionResultRowType[];
};

export type CompetitionResultRowType = {
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
  fileUrl: string | null;
  state5x5: boolean;
};

export type DivisionType = {
  value: string;
  label: string;
};

export type PlaceType = {
  competitionPlaceId?: number;
  address: string;
  placeName: string;
  latitude: number;
  longitude: number;
};

export type CompetitionDetailAttachedFileType = {
  competitionAttachedFileId: number;
  fileName: string;
  fileUrl: string;
};

export type AddCompetitionRequestType = {
  title: string;
  divisions: string[];
  startDate: string;
  endDate: string;
  participationStartDate: string | null;
  participationEndDate: string | null;
  places: PlaceType[];
  relatedURL: string | null;
  ckData: any;
  ckImgRequests: GetFileType[];
};

export type UpdateCompetitionRequestType = {
  title: string;
  divisions: string[] | undefined;
  startDate: string;
  endDate: string;
  participationStartDate: string | null;
  participationEndDate: string | null;
  updatePlaces: PlaceType[];
  relatedURL: string | null;
  ckData: any;
  ckImgRequests: GetFileType[];
  uploadedAttachedFiles: string[];
  deletedCkImgUrls: string[];
};

export type AddCompetitionScheduleType = {
  division: string;
  postCompetitionScheduleRow: AddCompetitionScheduleRowType[];
};

export type AddCompetitionScheduleRowType = {
  competitionResultId?: number;
  gameNumber: number;
  startDate: string;
  floor: string;
  place: string;
  homeName: string;
  awayName: string;
  state5x5: boolean;
};

export type AddCompetitionResultType = {
  division: string;
  postResultRequestRows: AddCompetitionResultRowType[];
};

export type AddCompetitionResultRowType = {
  competitionResultId: number | null;
  gameNumber: number;
  startDate: string;
  floor: string;
  place: string;
  homeName: string;
  awayName: string;
  state5x5: boolean;
  homeScore: number | null;
  awayScore: number | null;
  fileUrl: string | null;
  fileName: string | null;
};

export type DivisionResponseType = {
  divisionId: string;
  divisionName: string;
};
