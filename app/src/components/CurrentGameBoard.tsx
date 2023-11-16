import { IColorProps } from "@/interfaces/IColorProps";
import { Game } from "@/types/Game";
import Image from "next/image";
import TeamColor from "./TeamColor";

interface ICurrentGameBoardProps {
  currentGame: Game | undefined;
}

const CurrentGameBoard = ({
  currentGame,
  homeTeamPaletteColor,
  setHomeTeamPaletteColor,
  awayTeamPaletteColor,
  setAwayTeamPaletteColor,
}: ICurrentGameBoardProps & IColorProps) => {
  if (!currentGame) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 justify-center">
      <div className="flex flex-col gap-4 items-center">
        <p className="italic">{currentGame.Match}</p>
        <div className="flex gap-4 justify-center items-center">
          <div className="flex flex-col gap-2 items-center">
            <Image
              id="HomeTeamLogo"
              src={currentGame["Domicile - Logo (sm)"]}
              width={75}
              height={75}
              alt="Home Team Logo"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <TeamColor
              homeTeamPaletteColor={homeTeamPaletteColor}
              awayTeamPaletteColor={awayTeamPaletteColor}
              setHomeTeamPaletteColor={setHomeTeamPaletteColor}
              setAwayTeamPaletteColor={setAwayTeamPaletteColor}
            />
          </div>
          <div className="flex flex-col gap-2 items-center">
            <Image
              id="AwayTeamLogo"
              src={currentGame["Extérieur - Logo (sm)"]}
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
