"use client";
import { Game } from "@/types/Game";
import { useState } from "react";
import GameForm from "./GameForm";
import GenerateImage from "./GenerateImage";

interface IFormContainerProps {
  gamesId: string[];
}

const FormContainer = ({ gamesId }: IFormContainerProps) => {
  const [currentGame, setCurrentGame] = useState<Game | undefined>(undefined);

  return (
    <div className="flex h-full justify-center items-center gap-8">
      <div className="h-full w-1/3 flex flex-col gap-4">
        <GameForm gamesId={gamesId} setCurrentGame={setCurrentGame} />
        <div
          className={`h-full p-4 bg-secondary overflow-scroll ${
            currentGame
              ? ""
              : "text-xl text-primary font-bold flex justify-center items-center"
          }`}
        >
          <pre>
            {currentGame
              ? JSON.stringify(currentGame, null, 4)
              : "Non défini"}
          </pre>
        </div>
      </div>
      <GenerateImage currentGame={currentGame} />
    </div>
  );
};

export default FormContainer;
