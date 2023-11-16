"use client";
import { Game } from "@/types/Game";
import { RGBColor } from "colorthief";
import { useState } from "react";
import CurrentGameBoard from "./CurrentGameBoard";
import GameForm from "./GameForm";
import GenerateImage from "./GenerateImage";

interface IFormContainerProps {
  gamesId: string[];
}

const FormContainer = ({ gamesId }: IFormContainerProps) => {
  const [currentGame, setCurrentGame] = useState<Game | undefined>(undefined);

  const [homeTeamPaletteColor, setHomeTeamPaletteColor] = useState<RGBColor[]>(
    []
  );
  const [awayTeamPaletteColor, setAwayTeamPaletteColor] = useState<RGBColor[]>(
    []
  );

  return (
    <div className="flex h-full justify-center items-center gap-8">
      <div className="h-full w-1/3 flex flex-col gap-6">
        <GameForm gamesId={gamesId} setCurrentGame={setCurrentGame} />
        <CurrentGameBoard
          currentGame={currentGame}
          homeTeamPaletteColor={homeTeamPaletteColor}
          awayTeamPaletteColor={awayTeamPaletteColor}
          setHomeTeamPaletteColor={setHomeTeamPaletteColor}
          setAwayTeamPaletteColor={setAwayTeamPaletteColor}
        />
        <div
          className={`h-full p-4 bg-secondary overflow-scroll ${
            currentGame
              ? ""
              : "text-xl text-primary font-bold flex justify-center items-center"
          }`}
        >
          <pre>
            {currentGame ? JSON.stringify(currentGame, null, 4) : "Non défini"}
          </pre>
        </div>
      </div>
      <GenerateImage
        currentGame={currentGame}
        homeTeamPaletteColor={homeTeamPaletteColor}
        awayTeamPaletteColor={awayTeamPaletteColor}
      />
    </div>
  );
};

export default FormContainer;
