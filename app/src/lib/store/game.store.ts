import { Game } from "@/types/Game";
import { create } from "zustand";

type GameStoreType = {
  game: Game | undefined;
  setGame: (newGame: Game | undefined) => void;
  resetGame: () => void;
};

const defaultGame = undefined;

const useGameStore = create<GameStoreType>((set) => ({
  game: defaultGame,
  setGame: (newGame: Game | undefined) => {
    set({
      game: newGame,
    });
  },
  resetGame: () => {
    set({ game: defaultGame });
  },
}));

export default useGameStore;
