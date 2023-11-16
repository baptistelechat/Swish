import { IColorProps } from "@/interfaces/IColorProps";
import { Game } from "@/types/Game";
import Image from "next/image";

interface IGenerateImageProps {
  currentGame: Game | undefined;
}

const GenerateImage = ({
  currentGame,
  homeTeamPaletteColor,
  awayTeamPaletteColor,
}: IGenerateImageProps &
  Omit<IColorProps, "setHomeTeamPaletteColor" | "setAwayTeamPaletteColor">) => {
  if (!currentGame) {
    return null;
  }

  if (!homeTeamPaletteColor[0] && !awayTeamPaletteColor[0]) {
    return null;
  }
  
  return (
    <div className="relative w-[540px] h-[540px] bg-primary-foreground overflow-hidden">
      {/* Angle supérieur */}
      <div
        className="absolute top-0 left-0 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded shadow-xl"
        style={{
          backgroundColor: `rgb(${homeTeamPaletteColor[0][0]},${homeTeamPaletteColor[0][1]},${homeTeamPaletteColor[0][2]})`,
        }}
      />
      {/* Angle inférieur */}
      <div
        className="absolute bottom-0 right-0 w-1/2 h-1/2 translate-x-1/2 translate-y-1/2 rotate-45 rounded shadow-xl"
        style={{
          backgroundColor: `rgb(${awayTeamPaletteColor[0][0]},${awayTeamPaletteColor[0][1]},${awayTeamPaletteColor[0][2]})`,
        }}
      />
      {/* Domicile - Logo */}
      <div className="absolute top-1/2 left-[22%] -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-primary flex items-center justify-center font-bold text-3xl rounded shadow-2xl">
        <Image
          src={currentGame["Domicile - Logo (sm)"]}
          width={100}
          height={100}
          alt="Home Picture"
        />
      </div>
      {/* Extérieur - Logo */}
      <div className="absolute top-1/2 right-[22%] translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-primary flex items-center justify-center font-bold text-3xl rounded shadow-2xl">
        <Image
          src={currentGame["Extérieur - Logo (sm)"]}
          width={100}
          height={100}
          alt="Home Picture"
        />
      </div>
      {/* Score */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-primary text-primary-foreground flex items-center justify-center font-bold text-3xl rounded shadow-2xl">
        {`${currentGame["Domicile - Final"]} - ${currentGame["Extérieur - Final"]}`}
      </div>
    </div>
  );
};

export default GenerateImage;
