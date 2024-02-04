import { create } from "zustand";

type AwayTeamPaletteColorStoreType = {
  awayTeamPaletteColor: string[];
  setAwayTeamPaletteColor: (newAwayTeamPaletteColor: string[]) => void;
  resetAwayTeamPaletteColor: () => void;
};

const defaultAwayTeamPaletteColor: string[] = [];

const useAwayTeamPaletteColorStore = create<AwayTeamPaletteColorStoreType>(
  (set) => ({
    awayTeamPaletteColor: defaultAwayTeamPaletteColor,
    setAwayTeamPaletteColor: (newAwayTeamPaletteColor: string[]) => {
      set({
        awayTeamPaletteColor: newAwayTeamPaletteColor,
      });
    },
    resetAwayTeamPaletteColor: () => {
      set({ awayTeamPaletteColor: defaultAwayTeamPaletteColor });
    },
  })
);

export default useAwayTeamPaletteColorStore;
