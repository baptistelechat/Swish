import { TPeriod } from "./TPeriod";

export interface IScore {
  period: TPeriod;
  q1: {
    home: number | null;
    away: number | null;
  };
  q2: {
    home: number | null;
    away: number | null;
  };
  q3: {
    home: number | null;
    away: number | null;
  };
  q4: {
    home: number | null;
    away: number | null;
  };
  ot1: {
    home: number | null;
    away: number | null;
  };
  ot2: {
    home: number | null;
    away: number | null;
  };
  ot3: {
    home: number | null;
    away: number | null;
  };
  final: {
    home: number | null;
    away: number | null;
  };
}
