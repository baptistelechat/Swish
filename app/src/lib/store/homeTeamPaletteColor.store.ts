import { create } from "zustand";

type HomeTeamPaletteColorStoreType = {
  homeTeamPaletteColor: string[];
  setHomeTeamPaletteColor: (newHomeTeamPaletteColor: string[]) => void;
  resetHomeTeamPaletteColor: () => void;
};

const defaultHomeTeamPaletteColor: string[] = [];

const useHomeTeamPaletteColorStore = create<HomeTeamPaletteColorStoreType>(
  (set) => ({
    homeTeamPaletteColor: defaultHomeTeamPaletteColor,
    setHomeTeamPaletteColor: (newHomeTeamPaletteColor: string[]) => {
      set({
        homeTeamPaletteColor: newHomeTeamPaletteColor,
      });
    },
    resetHomeTeamPaletteColor: () => {
      set({ homeTeamPaletteColor: defaultHomeTeamPaletteColor });
    },
  })
);

export default useHomeTeamPaletteColorStore;
