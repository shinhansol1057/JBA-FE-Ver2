"use client";
import { useCompetitionStore } from "@/states/CompetitionStore";

const CompetitionStatus = () => {
  const { competitionStatusMenu, setCompetitionStatusMenu } =
    useCompetitionStore();
  return (
    <div
      className={
        "w-[280px] sm:w-[400px] md:w-[800px] " +
        "h-[30px] sm:h-[40px] md:h-[60px] " +
        "text-[12px] sm:text-[14px] md:text-[20px] " +
        "mb-[10px] sm:mb-[20px] " +
        "shadow-lg rounded-[8px] border border-solid border-[rgba(115,115,115,0.2)] box-content grid grid-cols-4 "
      }
    >
      <button
        className={
          "h-full " +
          (competitionStatusMenu === "ALL"
            ? "bg-black text-white rounded-[8px]"
            : "")
        }
        onClick={() => {
          setCompetitionStatusMenu("ALL");
        }}
      >
        전체
      </button>
      <button
        className={
          "h-full " +
          (competitionStatusMenu === "EXPECTED"
            ? "bg-black text-white rounded-[8px]"
            : "")
        }
        onClick={() => {
          setCompetitionStatusMenu("EXPECTED");
        }}
      >
        예정
      </button>
      <button
        className={
          "h-full " +
          (competitionStatusMenu === "PROCEEDING"
            ? "bg-black text-white rounded-[8px]"
            : "")
        }
        onClick={() => {
          setCompetitionStatusMenu("PROCEEDING");
        }}
      >
        진행중
      </button>
      <button
        className={
          "h-full " +
          (competitionStatusMenu === "COMPLETE"
            ? "bg-black text-white rounded-[8px]"
            : "")
        }
        onClick={() => {
          setCompetitionStatusMenu("COMPLETE");
        }}
      >
        종료
      </button>
    </div>
  );
};

export default CompetitionStatus;
