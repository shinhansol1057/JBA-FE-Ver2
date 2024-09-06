import { create } from "zustand";
import { persist } from "zustand/middleware";

type competitionStore = {
  competitionStatusMenu: string;
  setCompetitionStatusMenu: (competitionStatusMenu: string) => void;
};

export const useCompetitionStore = create(
  persist<competitionStore>(
    (set) => ({
      competitionStatusMenu: "ALL",
      setCompetitionStatusMenu: (competitionStatusMenu: string) =>
        set({ competitionStatusMenu: competitionStatusMenu }),
    }),
    {
      name: "competitionStore",
    },
  ),
);
