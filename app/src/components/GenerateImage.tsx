import { IColorProps } from "@/interfaces/IColorProps";
import { Game } from "@/types/Game";
import { ColorTranslator } from "colortranslator";
import Image from "next/image";
import Angle from "./GenerateImage/components/Angle";

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

  if (!homeTeamPaletteColor[0] || !awayTeamPaletteColor[0]) {
    return null;
  }

  const minContrast = 2;
  const targetContrast = 4.5;

  const homeTeamPaletteContrast = Math.floor(
    (new ColorTranslator(homeTeamPaletteColor[1]).L + 0.05) /
      (new ColorTranslator(homeTeamPaletteColor[0]).L + 0.05)
  );

  const awayTeamPaletteContrast = Math.floor(
    (new ColorTranslator(awayTeamPaletteColor[1]).L + 0.05) /
      (new ColorTranslator(awayTeamPaletteColor[0]).L + 0.05)
  );

  console.log(homeTeamPaletteContrast, awayTeamPaletteContrast);

  return (
    <div className="relative w-[1080px] h-[1080px] bg-primary-foreground overflow-hidden scale-50">
      {/* Angle supérieur (Domicile) */}
      <div
        className="absolute top-0 left-0 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded shadow-xl"
        style={{
          backgroundColor: homeTeamPaletteColor[0],
        }}
      />
      {/* Angle inférieur (Extérieur) */}
      <div
        className="absolute bottom-0 right-0 w-1/2 h-1/2 translate-x-1/2 translate-y-1/2 rotate-45 rounded shadow-xl"
        style={{
          backgroundColor: awayTeamPaletteColor[0],
        }}
      />
      {/* Domicile - Logo */}
      <div
        className="absolute top-1/2 left-[22%] -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 flex items-center justify-center font-bold text-3xl rounded shadow-2xl"
        style={{
          backgroundColor:
            homeTeamPaletteContrast <= minContrast
              ? new ColorTranslator(homeTeamPaletteColor[1]).setL(
                  new ColorTranslator(homeTeamPaletteColor[0]).L *
                    targetContrast
                ).HEX
              : homeTeamPaletteColor[1],
        }}
      >
        <Image
          src={currentGame["Domicile - Logo (md)"]}
          width={200}
          height={200}
          alt="Home Picture"
        />
      </div>
      {/* Extérieur - Logo */}
      <div
        className="absolute top-1/2 right-[22%] translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 flex items-center justify-center font-bold text-3xl rounded shadow-2xl"
        style={{
          backgroundColor:
            awayTeamPaletteContrast <= minContrast
              ? new ColorTranslator(awayTeamPaletteColor[1]).setL(
                  new ColorTranslator(awayTeamPaletteColor[0]).L *
                    targetContrast
                ).HEX
              : awayTeamPaletteColor[1],
        }}
      >
        <Image
          src={currentGame["Extérieur - Logo (md)"]}
          width={200}
          height={200}
          alt="Home Picture"
        />
      </div>
      {/* Score */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-primary text-primary-foreground flex items-center justify-center font-bold text-6xl rounded shadow-2xl">
        {`${currentGame["Domicile - Final"]} - ${currentGame["Extérieur - Final"]}`}
      </div>
      {/* Brush au couleur Domicile */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3">
        <Angle
          color={
            homeTeamPaletteContrast <= minContrast
              ? new ColorTranslator(homeTeamPaletteColor[1]).setL(
                  new ColorTranslator(homeTeamPaletteColor[0]).L *
                    targetContrast
                ).HEX
              : homeTeamPaletteColor[1]
          }
        />
      </div>
      {/* Brush au couleur Domicile */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 rotate-180">
        <Angle
          color={
            awayTeamPaletteContrast <= minContrast
              ? new ColorTranslator(awayTeamPaletteColor[1]).setL(
                  new ColorTranslator(awayTeamPaletteColor[0]).L *
                    targetContrast
                ).HEX
              : awayTeamPaletteColor[1]
          }
        />
      </div>
    </div>
  );
};

export default GenerateImage;
