"use client";

import useGameStore from "@/lib/store/game.store";
import Image from "next/image";
import Reset from "./Reset";
import TeamColor from "./TeamColor";

const CurrentGameBoard = () => {
  // Game
  const game = useGameStore((s) => s.game);

  if (!game) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex flex-col items-center gap-4">
        <p className="italic">{game.Match}</p>
        <Reset />
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Image
              id="HomeTeamLogo"
              src={game["Domicile - Logo (sm)"]}
              width={75}
              height={75}
              alt="Home Team Logo"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <TeamColor />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              id="AwayTeamLogo"
              src={game["Extérieur - Logo (sm)"]}
              width={75}
              height={75}
              alt="Away Team Logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentGameBoard;
