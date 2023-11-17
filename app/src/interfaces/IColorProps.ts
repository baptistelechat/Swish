import { Dispatch, SetStateAction } from "react";

export interface IColorProps {
  homeTeamPaletteColor: string[];
  awayTeamPaletteColor: string[];
  setHomeTeamPaletteColor: Dispatch<SetStateAction<string[]>>;
  setAwayTeamPaletteColor: Dispatch<SetStateAction<string[]>>;
}