import { IScore } from "./IScore";
import { ITeam } from "./ITeam";

export interface IGame {
  date: Date | null;
  championshipName: string | null;
  championshipDayNumber: string | null;
  home: ITeam;
  away: ITeam;
  colors: {
    home: string | null;
    away: string | null;
  };
  location: string | null;
  score: IScore | null;
}

export interface IGameWithoutDetails
  extends Omit<IGame, "colors" | "location" | "score"> {}

export interface IGameDetails
  extends Pick<IGame, "colors" | "location" | "score"> {}
