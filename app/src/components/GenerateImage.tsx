"use client";

import useAwayTeamPaletteColorStore from "@/lib/store/awayTeamPaletteColor.store";
import useGameStore from "@/lib/store/game.store";
import useHomeTeamPaletteColorStore from "@/lib/store/homeTeamPaletteColor.store";
import { ColorTranslator } from "colortranslator";
import Image from "next/image";
import Angle from "./GenerateImage/components/Angle";

const GenerateImage = () => {
  const game = useGameStore((s) => s.game);
  const homeTeamPaletteColor = useHomeTeamPaletteColorStore(
    (s) => s.homeTeamPaletteColor
  );
  const awayTeamPaletteColor = useAwayTeamPaletteColorStore(
    (s) => s.awayTeamPaletteColor
  );

  if (!game) {
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

  return (
    <div className="bg-primary-foreground relative size-[1080px] overflow-hidden">
      {/* Angle supérieur (Domicile) */}
      <div
        className="absolute left-0 top-0 size-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded shadow-xl"
        style={{
          backgroundColor: homeTeamPaletteColor[0],
        }}
      />
      {/* Angle inférieur (Extérieur) */}
      <div
        className="absolute bottom-0 right-0 size-1/2 translate-x-1/2 translate-y-1/2 rotate-45 rounded shadow-xl"
        style={{
          backgroundColor: awayTeamPaletteColor[0],
        }}
      />
      {/* Domicile - Logo */}
      <div
        className="absolute left-[22%] top-1/2 flex size-1/4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded text-3xl font-bold shadow-2xl"
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
          src={game["Domicile - Logo (md)"]}
          width={200}
          height={200}
          alt="Home Picture"
        />
      </div>
      {/* Extérieur - Logo */}
      <div
        className="absolute right-[22%] top-1/2 flex size-1/4 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded text-3xl font-bold shadow-2xl"
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
          src={game["Extérieur - Logo (md)"]}
          width={200}
          height={200}
          alt="Home Picture"
        />
      </div>
      {/* Score */}
      <div className="bg-primary text-primary-foreground absolute left-1/2 top-1/2 flex size-1/3 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded text-6xl font-bold shadow-2xl">
        {`${game["Domicile - Final"]} - ${game["Extérieur - Final"]}`}
      </div>
      {/* Brush au couleur Domicile */}
      <div className="absolute left-0 top-0 size-1/3">
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
      <div className="absolute bottom-0 right-0 size-1/3 rotate-180">
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
