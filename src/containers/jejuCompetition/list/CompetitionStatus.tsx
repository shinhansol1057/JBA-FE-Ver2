"use client";
import { useCompetitionStore } from "@/states/CompetitionStore";

const CompetitionStatus = () => {
  const { competitionStatusMenu, setCompetitionStatusMenu } =
    useCompetitionStore();
  return (
    <div
      className={
        "w-full h-10 sm:h-12 md:h-14 " +
        "text-sm sm:text-base md:text-xl " +
        "mb-2.5 sm:mb-5 " +
        "shadow-lg rounded-lg border border-solid border-[rgba(115,115,115,0.2)] box-content grid grid-cols-4 "
      }
    >
      <button
        className={
          competitionStatusMenu === "ALL"
            ? "bg-black text-white rounded-lg"
            : ""
        }
        onClick={() => {
          setCompetitionStatusMenu("ALL");
        }}
      >
        전체
      </button>
      <button
        className={
          competitionStatusMenu === "EXPECTED"
            ? "bg-black text-white rounded-lg"
            : ""
        }
        onClick={() => {
          setCompetitionStatusMenu("EXPECTED");
        }}
      >
        예정
      </button>
      <button
        className={
          competitionStatusMenu === "PROCEEDING"
            ? "bg-black text-white rounded-lg"
            : ""
        }
        onClick={() => {
          setCompetitionStatusMenu("PROCEEDING");
        }}
      >
        진행중
      </button>
      <button
        className={
          competitionStatusMenu === "COMPLETE"
            ? "bg-black text-white rounded-lg"
            : ""
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
