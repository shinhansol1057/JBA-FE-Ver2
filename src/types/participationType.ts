import { GetFileType } from "@/types/commonType";

type ParticipationCardType = {
  participationCompetitionId: number;
  competitionName: string;
  divisionName: string;
  applicantDate: string;
  participationStartDate: string;
  participationEndDate: string;
  updatedAt: string | null;
};

interface ParticipationDetailType {
  participationCompetitionId: number;
  competitionName: string;
  divisionName: string;
  applicantDate: string;
  updatedAt: string | null;
  participationStartDate: string;
  participationEndDate: string;
  email: string;
  name: string;
  phoneNum: string;
  competitionId: number;
  competitionStartDate: string;
  competitionEndDate: string;
  files: GetFileType[];
}

export type { ParticipationCardType, ParticipationDetailType };
