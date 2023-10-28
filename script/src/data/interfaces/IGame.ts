import { IScore } from "./IScore";
import { ITeamResult } from "./ITeamResult";

export interface IGame {
  date: Date | null;
  championshipDayNumber: number | null;
  home: ITeamResult;
  away: ITeamResult;
  location: string | null;
  score: IScore | null;
}

export interface IGameWithoutDetails
  extends Omit<IGame, "location" | "score"> {}

export interface IGameDetails
  extends Pick<IGame, "location" | "score" > {}
