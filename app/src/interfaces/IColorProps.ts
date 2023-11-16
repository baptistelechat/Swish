import { RGBColor } from "colorthief";
import { Dispatch, SetStateAction } from "react";

export interface IColorProps {
  homeTeamPaletteColor: RGBColor[];
  setHomeTeamPaletteColor: Dispatch<SetStateAction<RGBColor[]>>;
  awayTeamPaletteColor: RGBColor[];
  setAwayTeamPaletteColor: Dispatch<SetStateAction<RGBColor[]>>;
}