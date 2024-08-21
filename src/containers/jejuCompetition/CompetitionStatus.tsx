"use client";
type Props = {
  competitionStatus: string;
  setCompetitionStatus: (
    value: ((prevState: string) => string) | string,
  ) => void;
};

const CompetitionStatus = ({
  competitionStatus,
  setCompetitionStatus,
}: Props) => {
  return (
    <div
      className={
        "w-[280px] h-[30px] shadow-lg rounded-[8px] border border-solid border-[rgba(115,115,115,0.2)] box-content text-[12px]"
      }
    >
      <button
        className={
          "h-full w-[70px] " +
          (competitionStatus === "ALL"
            ? "bg-black text-white rounded-[8px]"
            : "")
        }
        onClick={() => setCompetitionStatus("ALL")}
      >
        전체
      </button>
      <button
        className={
          "h-full w-[70px] " +
          (competitionStatus === "EXPECTED"
            ? "bg-black text-white rounded-[8px]"
            : "")
        }
        onClick={() => setCompetitionStatus("EXPECTED")}
      >
        예정
      </button>
      <button
        className={
          "h-full w-[70px] " +
          (competitionStatus === "PROCEEDING"
            ? "bg-black text-white rounded-[8px]"
            : "")
        }
        onClick={() => setCompetitionStatus("PROCEEDING")}
      >
        진행
      </button>
      <button
        className={
          "h-full w-[70px] " +
          (competitionStatus === "COMPLETE"
            ? "bg-black text-white rounded-[8px]"
            : "")
        }
        onClick={() => setCompetitionStatus("COMPLETE")}
      >
        종료
      </button>
    </div>
  );
};

export default CompetitionStatus;
